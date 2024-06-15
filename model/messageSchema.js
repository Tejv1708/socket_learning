
import mongoose from 'mongoose';

const schema = new mongoose.Schema( {
    friendsAndConversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "friendsAndConversation",
    },
    sender_id: {
        // type: String
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    message: {
        textmessage: {
            type: String
        }, file: {
            type: Array
        }
    }


}, { timestamps: true } )

const messagesmodel = new mongoose.model( "messages", schema )

export default messagesmodel






