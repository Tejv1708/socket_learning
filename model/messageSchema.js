
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema( {
    text: String,
    name: String,
    id: String,
    socketID: String

} );

const Message = mongoose.model( 'Message', messageSchema );

export default Message;



