import express from 'express';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { createServer } from 'http'

import cors from 'cors'
import Message from './model/messageSchema.js';
import router from './Routes/messageRoutes.js';
import 'dotenv/config'


const app = express();
const server = createServer( app )
//Instance of the socket.io 

const io = new Server( server );


app.use( cors() )


app.use( express.json() );
app.use( '/', router )





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


