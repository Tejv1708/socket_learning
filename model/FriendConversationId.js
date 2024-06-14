import mongoose from "mongoose";

const FriendConversationSchema = new mongoose.Schema( {
    senderID: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    receiverID: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
} )

const FriendConversation = mongoose.model( 'FriendConversation', FriendConversationSchema );

export default FriendConversation;