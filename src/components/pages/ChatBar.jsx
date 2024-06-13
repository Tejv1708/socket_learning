import React from 'react';

const ChatBar = ( { messages } ) => {
    // Extract unique usernames from messages
    const activeUsers = [ ...new Set( messages.map( data => data.name ) ) ];

    return (
        <div className="chat__sidebar bg-gray-200 p-4">
            <h2 className="text-xl font-semibold mb-4">Open Chat</h2>

            <div>
                <h4 className="text-lg font-semibold mb-2">ACTIVE USERS</h4>
                <div className="flex flex-col gap-2">
                    { activeUsers.map( ( username, index ) => (
                        <li key={ index }>{ username }</li>
                    ) ) }
                </div>
            </div>
        </div>
    );
};

export default ChatBar;

