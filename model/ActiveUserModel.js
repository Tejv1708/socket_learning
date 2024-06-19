import mongoose from "mongoose";

const ActiveUsersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        user_id: {
            type: String
        },
        socket_id: {
            type: String
        }
    }
)

const ActiveUsers = mongoose.model( 'activeUser', ActiveUsersSchema )
export default ActiveUsers