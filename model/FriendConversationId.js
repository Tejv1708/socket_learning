import mongoose from "mongoose";

const FriendConversationSchema = new mongoose.Schema( {
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: [ "pending", "Accept", "rejected" ],
        default: "pending"  // Set the default value to "pending"
    },
}, { timestamps: true } )

const FriendConversation = mongoose.model( 'FriendConversation', FriendConversationSchema );

export default FriendConversation;