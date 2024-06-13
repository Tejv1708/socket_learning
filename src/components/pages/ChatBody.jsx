import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../axios/instance';
import ChatFooter from './ChatFooter';

const ChatBody = ( { messages } ) => {
    const navigate = useNavigate();

    const handleLeaveChat = async () => {
        localStorage.removeItem( 'userName' );
        navigate( '/' );
        window.location.reload();
    };

    return (
        <>
            <header className="flex justify-between items-center bg-gray-800 text-white px-4 py-2">
                <p className="text-lg font-semibold">Hangout with Colleagues</p>
                <button className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-white" onClick={ handleLeaveChat }>
                    LEAVE CHAT
                </button>
            </header>

            <div className="flex flex-col h-full">
                {/* This shows messages */ }
                <div className="flex-grow overflow-y-auto p-4">
                    <ul>
                        { messages.map( ( data, index ) => (
                            <li
                                key={ index }
                                className={ `mb-2 ${ data.name === localStorage.getItem( 'userName' ) ? 'flex justify-end' : 'flex justify-start'
                                    }` }
                            >
                                <div className={ `${ data.name === localStorage.getItem( 'userName' ) ? 'bg-blue-500 text-white rounded-br-md rounded-bl-md rounded-tl-md px-4 py-2 inline-block' : 'bg-gray-200 text-gray-800 rounded-bl-md rounded-br-md rounded-tr-md px-4 py-2 inline-block'
                                    }` }>
                                    <p className="text-sm font-semibold">{ data.name }</p>
                                    <p className="text-sm text-gray-400">{ new Date( data.createdAt ).toLocaleString() }</p>
                                    <p>{ data.text }</p>
                                </div>
                            </li>
                        ) ) }
                    </ul>
                </div>

                {/* This is triggered when a user is typing */ }
                {/* <div className="message__status">
                    <p>Someone is typing...</p>
                </div> */}
            </div>

        </>
    );
};

export default ChatBody;
