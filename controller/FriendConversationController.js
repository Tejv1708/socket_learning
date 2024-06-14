import FriendConversation from '../model/FriendConversationId.js'



export const generatedId = async ( req, res, next ) => {
    try {
        const { senderID, receiverID } = req.body;
        console.log( "IDs", req.body )

        const existingConversation = await FriendConversation.findOne( {
            $or: [
                { senderID: senderID, receiverID: receiverID },
                { senderID: receiverID, receiverID: senderID }
            ]
        } );

        console.log( existingConversation )

        if ( existingConversation ) {
            return res.status( 404 ).json( 'Chat Group is already created ' );
        }

        // const senderDetail = User.findById( senderID ).populate( "User" )
        // const receiverDetail = User.findById( receiverID ).populate( "User" )

        // console.log( receiverDetail )
        // console.log( senderDetail )
        // Create new FriendConversation document

        console.log()
        const newConversation = await FriendConversation.create( {
            receiverID: receiverID,
            senderID: senderID
        } );

        res.status( 201 ).json( {
            data: newConversation,
            status: 'New conversation created'
        } );

    } catch ( err ) {
        console.log( err );
        res.status( 500 ).json( 'Internal Server Error' );
    }
};

// export const generatedId = async ( req, res, next ) => {
//     try {

//         const { userId1, userId2 } = req.body

//         // const user1 = await User.findById( userId1 );
//         // const user2 = await User.findById( userId2 );


//         // if ( !user1 || !user2 ) {
//         //     return res.status( 404 ).json( 'User not found' )
//         // }

//         // const existingConversation = await FriendConversation.findOne( {
//         //     $or: [
//         //         {
//         //             user1: userId, user2: currentUser
//         //         }, {
//         //             user1: currentUser, user2: userId
//         //         }
//         //     ]
//         // } )

//         // if ( existingConversation ) {
//         //     return res.status( 200 ).json( 'You can do  conversation' )
//         // }

//         const newId = await FriendConversation.create( {
//             user1: userId1.populate(),
//             user2: userId2.populate(),

//         } )

//         res.status( 201 ).json( {
//             data: newId,
//             status: 'Id is generated'
//         } )

//     } catch ( err ) {
//         console.log( err )
//     }
// }