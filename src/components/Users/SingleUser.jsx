import React, { useEffect } from 'react'
import instance from '../../axios/instance'
import { useLocation, useParams } from 'react-router-dom'

const SingleUser = () => {
    const { id } = useParams()
    const location = useLocation()
    console.log( typeof ( id ) )
    console.log( typeof ( localStorage.getItem( "id" ) ) )
    // console.log( localStorage.getItem( "activeUser" ) )

    async function handleConversationId() {
        await instance.post( '/create-conversation', {
            sender_id: localStorage.get( "id" ),
            receiver_id: id
        } )
    }

    useEffect( () => {
        async function User() {
            const user = await instance.get( `/user/${ id }` )
            console.log( user )
        }
        User()
    } )
    return (

        <div className=''>
            <div>
                <Messages />
            </div>
        </div>

    )
}

export default SingleUser