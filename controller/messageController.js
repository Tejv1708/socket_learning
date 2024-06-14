import Message from "../model/messageSchema.js";
import { uploads } from "../utils/multer.js";


export const createMessage = async ( req, res ) => {

    try {
        const { senderID, friendsAndConversationId, textmessage } = req.body;

        const fileData = req.file ? [ req.file.filename ] : [];

        const newMessage = new messagesmodel( {
            friendsAndConversationId: conversationObjectId,
            sender_id: senderObjectId,
            message: {
                textmessage: textmessage,
                file: fileData
            }
        } );

        const savedMessage = await newMessage.save();

        res.status( 201 ).json( {
            data: savedMessage,
            status: 'Message created successfully'
        } );

    } catch ( error ) {
        res.status( 500 ).json( { error: error.message } )
    }
}

export const getMessage = async ( req, res ) => {
    try {
        const messages = await Message.find();
        res.status( 200 ).json( messages )
    } catch ( error ) {
        res.status( 500 ).json( { error: error.message } )
    }
}


export const deleteMessage = async ( req, res ) => {
    try {
        await Message.deleteMany()
        res.status( 204 ).json( {
            message: "data successfully deleted "
        } )
    } catch ( err ) {
        console.log( err )
    }
}
