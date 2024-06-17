import { useEffect, useState } from 'react';
import instance from '../../axios/instance.jsx';
import React from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [ users, setUsers ] = useState( [] );
    const [ receiver_id, setReceiver_id ] = useState( "" )
    const [ sender_id, setSender_id ] = useState( "" )

    useEffect( () => {
        async function getAllUsers() {
            try {
                const { data: { data } } = await instance.get( '/user' );
                // console.log( data );
                setUsers( data ); // Set the users directly to the response data
            } catch ( error ) {
                console.error( 'Error fetching users:', error );
            }
        }
        getAllUsers();
    }, [] );

    function handleConnect() {

    }


    return (
        <div className='bg-gray-100 min-h-screen p-4'>
            <h1 className='text-2xl font-bold mb-4'>User List</h1>
            <ul className='space-y-2'>
                { users.map( ( user ) => (
                    <li key={ user._id } className='bg-white p-4 rounded shadow flex items-center justify-between'>
                        <div className='flex items-center'>
                            <button onClick={ handleConnect } className='text-green-500 hover:text-green-700 mr-2'><Link to={ `/users/${ user.id }` }>+</Link></button>
                            <p>{ user.name }</p>
                        </div>
                    </li>
                ) ) }
            </ul>
        </div >
    );
};




export default UserList