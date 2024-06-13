import Message from "../model/messageSchema.js";

export const sendMessage = async ( req, res ) => {
    try {
        const { text } = req.body;
        const message = new Message( { text } )
        await message.save()
        res.status( 201 ).json( message )
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
