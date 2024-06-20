import { Server } from 'socket.io';
import { createServer } from 'http'
import { server } from './index.js'
import messagesmodel from './model/messageSchema.js';
import ActiveUsers from './model/ActiveUserModel.js';


const io = new Server( server );

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


    socket.on( 'send-req', async ( data ) => {
        try {
            const { sender_id, receiver_id } = data
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
            const newMessage = new messagesmodel( msg );
            console.log( newMessage )
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


