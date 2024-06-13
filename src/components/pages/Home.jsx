import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [ username, setUserName ] = useState( '' );

    const handleSubmit = ( e ) => {
        e.preventDefault();
        localStorage.setItem( 'userName', username );
        navigate( '/chat' ); // Redirect to the chat page after signing in
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Sign In To Open Chat</h2>
                <form onSubmit={ handleSubmit }>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={ username }
                            onChange={ ( e ) => setUserName( e.target.value ) }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            minLength={ 6 }
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 rounded-md bg-indigo-500 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Home;


