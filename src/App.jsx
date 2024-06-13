import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { io } from 'socket.io-client'
import instance from './axios/instance'
import Home from './components/pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatPage from './components/pages/ChatPage'

function App() {
  const socket = io( 'http://localhost:3000/', { transports: [ 'websocket' ] } )


  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={ <Home socket={ socket } /> }></Route>
            <Route path='/chat' element={ <ChatPage socket={ socket } /> }></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
