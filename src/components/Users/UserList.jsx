import { useEffect, useState } from 'react';
import instance from '../../axios/instance.jsx';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../actions/userSlices.js';

const UserList = ( { socket } ) => {
    const [ users, setUsers ] = useState( [] );
    const [ active, setActive ] = useState( [] )
    const dispatch = useDispatch()

    // Get the sender id 
    const { id } = useParams()
    console.log( id )

    const { data: user, loading, error } = useSelector( ( state ) => state.user || {} )

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

    useEffect( () => {
        socket.on( 'get-users', ( activeUsers ) => {
            setActive( activeUsers )
            console.log( activeUsers )
        } )

        return () => {
            socket.off( 'get-users' );
        };
    }, [] )




    // useEffect( () => {
    //     console.log( 'fetching the APi' )
    //     dispatch( fetchUserData() );
    // }, [ dispatch ] )

    // if ( loading ) {
    //     return <div>Loading</div>
    // }

    // if ( error ) {
    //     return <div>Error : { error }</div>
    // }

    // console.log( user )

    return (
        <div className='bg-gray-100 min-h-screen p-4'>
            <h1 className='text-2xl font-bold mb-4'>User List</h1>
            <ul className='space-y-2'>
                { users.map( ( user ) => (
                    <li key={ user._id } className='bg-white p-4 rounded shadow flex items-center justify-between'>
                        <div className='flex items-center'>
                            <button className='text-green-500 hover:text-green-700 mr-2'><Link to={ `/users/${ user.id }` }>+</Link></button>
                            <p>{ user.name }</p>
                        </div>
                    </li>
                ) ) }
            </ul>
            { console.log( active ) }
            <h1 className='text-2xl font-bold mb-4'>Active User </h1>
            <ul className='space-y-2'>
                { active.map( ( user ) => (
                    <li key={ user._id } className='bg-white p-4 rounded shadow flex items-center justify-between'>
                        <div className='flex items-center'>
                            <button className='text-green-500 hover:text-green-700 mr-2'><Link to={ `/users/${ user.id }` }>+</Link></button>
                            <p>{ user.name }</p>
                        </div>
                    </li>
                ) ) }
            </ul>
        </div >
    );
};




export default UserList