import { useEffect, useState } from 'react'
import './App.css'

import { WelcomePage } from './pages/welcome'
import { ChatPage } from './pages/chat'

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"))
  const [channel, setChannel] = useState(localStorage.getItem("username"))
  useEffect(() => {
    if (username)
      localStorage.setItem("username", username)
  }, [username])
  return (
    <div className="App">
      { username && channel 
        ? <ChatPage
            username={username}
            channel={channel}
          /> 
        : <WelcomePage 
          setUsername={setUsername}
          setChannel={setChannel}
        /> 
      }
    </div>
  )
}

export default App
