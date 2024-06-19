import ActiveUsers from "../model/ActiveUserModel.js";

export const getAllActiveUser = async ( req, res ) => {
    const activeUsers = await ActiveUsers.find( {} );
    res.status( 200 ).json( {
        activeUsers
    } )

} 