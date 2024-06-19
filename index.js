import express from 'express';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { createServer } from 'http'
import userRouter from './Routes/userRoutes.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import cors from 'cors'
import Message from './model/messageSchema.js';
import router from './Routes/messageRoutes.js';
import conversationRoute from './Routes/FriendConversationRoute.js'
import FriendConversation from './model/FriendConversationId.js';
import ActiverUserRoute from './Routes/ActiveUserRoute.js'
import 'dotenv/config'
import AppError from './utils/AppError.js';
import { globalErrorHandler } from './controller/errorContoller.js';
import ActiveUsers from './model/ActiveUserModel.js';


const app = express();
const server = createServer( app )
//Instance of the socket.io 
const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );
const io = new Server( server );


app.use( express.urlencoded( { extended: true } ) );
app.use( cors() )
app.use( '/uploads', express.static( path.join( __dirname, 'uploads' ) ) )
app.use( express.json() );
app.use( '/message', router )
app.use( '/user', userRouter )
app.use( '/create-conversation', conversationRoute )
app.use( '/active-users', ActiverUserRoute )
app.use( express.json() );

app.use( ( err, req, res, next ) => {
    console.error( err.stack );
    res.status( 500 ).send( 'Something broke!' );
} );

server.listen( 3000, () => console.log( 'Server is running on PORT 3000' ) )

mongoose.connect( process.env.MONGO_URL )
    .then( () => {
        console.log( 'Connected to MongoDB' );
    } )
    .catch( ( error ) => {
        console.error( 'Error connecting to MongoDB:', error.message );
    } );


// Socket.io connection

io.on( 'connection', ( socket ) => {
    let check = false;
    socket.on( 'new-user-added', async ( newUserId ) => {
        try {
            console.log( newUserId );

            // activeUsers.push( { name: newUserId.data.name, userId: newUserId.data._id, socketId: socket.id } )
            const { name, _id } = newUserId.data
            console.log( _id )
            const socket_id = socket.id

            const existingUser = await ActiveUsers.findOne( { user_id: _id } );

            if ( !existingUser ) {
                const activeUsers = new ActiveUsers( { name: name, user_id: _id, socket_id: socket_id } )
                // const activeUsers = new ActiveUsers( activeUserData );
                await activeUsers.save( {} )
            }

        } catch ( err ) {
            console.log( 'Error from Connection : ', err )
        }
    } )


    socket.on( 'send-req', ( data ) => {
        try {
            const { sender_id, receiver_id } = { data }
            console.log( sender_id, receiver_id )
        } catch ( err ) {
            console.log( 'Error from send_req : ', err )
        }

    } )

    // io.on("connection", (socket) => {
    //     socket.on( "say to someone", ( id, msg ) => {
    //         // send a private message to the socket with the given id
    //         socket.to( id ).emit( "my message", msg );
    //     } );
    // } );

    socket.on( 'message', async ( msg ) => {
        try {
            console.log( msg );
            io.emit( 'messageResponse', msg )
            const newMessage = new Message( msg );
            await newMessage.save();
        } catch ( err ) {
            console.log( 'Error from messages : ', err )
        }
    } )

    // socket.on( 'send-friend-request', async ( data ) => {
    //     try {
    //         const { sender_id, receiver_id } = data
    //         const friendsAndConversation = new FriendConversation( { sender_id: sender_id, receiver_id: receiver_id } )
    //         await friendsAndConversation.save()

    //         const receiverSocket_id = 
    //     } catch ( err ) {
    //         console.log( err )
    //     }
    // } )

    // Handle disconnection

    socket.on( 'check', async ( value ) => {
        check = value.check
        console.log( check )
    } )

    socket.on( 'disconnect', async () => {
        try {
            if ( check ) {
                const socketId = socket.id

                await ActiveUsers.deleteOne( {
                    socket_id: socketId
                } )
            }
            console.log( `User disconnected: ${ socket.id }` );
        } catch ( err ) {
            console.log(
                'Error handling from discoonection : ', error
            )
        }
    } );


    // socket.on( "offline", () => {
    //     // remove user from active users 

    // } )
} );


