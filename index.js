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
import 'dotenv/config'
import AppError from './utils/AppError.js';
import { globalErrorHandler } from './controller/errorContoller.js';



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
app.use( '/', router )
app.use( '/user', userRouter )
app.use( '/create-conversation', conversationRoute )

app.use( express.json() );


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

    socket.on( 'message', async ( msg ) => {

        console.log( msg );
        io.emit( 'messageResponse', msg )
        const newMessage = new Message( msg );
        await newMessage.save();

    } )
    // Handle disconnection
    socket.on( 'disconnect', () => {
        console.log( `User disconnected: ${ socket.id }` );

    } );
} );


