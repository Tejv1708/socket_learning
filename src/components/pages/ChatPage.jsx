import React, { useEffect, useState } from 'react'
import ChatBody from './ChatBody';
import ChatBar from './ChatBar';
import ChatFooter from './ChatFooter';
import { data } from 'autoprefixer';
import instance from '../../axios/instance';

const ChatPage = ( { socket } ) => {
    const [ messages, setMessages ] = useState( [] );

    useEffect( () => {
        async function fetchData() {
            try {
                const { data } = await instance.get( '/' );
                setMessages( data );
            } catch ( error ) {
                console.error( 'Error fetching messages:', error );
            }
        }
        fetchData();
    }, [] );

    useEffect( () => {
        socket.on( 'messageResponse', ( data ) => setMessages( [ ...messages, data ] ) )
    } )


    return (
        <div >
            <ChatBar messages={ messages } />
            <div >
                <ChatBody messages={ messages } />
                <ChatFooter socket={ socket } />
            </div>
        </div>
    );
}

export default ChatPage