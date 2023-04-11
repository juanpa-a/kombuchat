import { useEffect, useState } from 'react'
import './App.css'

import { WelcomePage } from './pages/welcome'
import { ChatPage } from './pages/chat'

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"))
  useEffect(() => {
    if (username)
      localStorage.setItem("username", username)
  }, [username])
  return (
    <div className="App">
      { username 
        ? <ChatPage/> 
        : <WelcomePage setUsername={setUsername}/> 
      }
    </div>
  )
}

export default App
