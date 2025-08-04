import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { socket } from './socket.jsx'
import { useEffect } from 'react'

function App() {
  const [msg, setMsg] = useState('');
  const [inCommingMsg, setInCommingMsg] = useState([])


  useEffect(() => {
    const handleMessage = (msg) => {
      setInCommingMsg(prev => [...prev, msg])
    }

    socket.on('message', handleMessage)
    return () => {
      socket.off('message', handleMessage)
    }
  }, [])

  const buttonClick = () => {
    socket.emit('user-message', msg)
  }

  return (
    <>
      <div>
        <h1>Socket IO Demo</h1>
      </div>
      <div>
        <input type='text' value={msg} onChange={(e) => { setMsg(e.target.value) }} />
        <button onClick={buttonClick}>Send</button>
        <h2>{inCommingMsg.map((msg, i) => {
          return (<div key={i}>{msg}</div>)
        })}</h2>
      </div>

    </>
  )
}

export default App
