import { useState } from 'react'
import SpotifyNowPlaying from "./spotify/SpotifyNowPlaying"
import { ChakraProvider } from "@chakra-ui/react"
import {
  BrowserRouter as Router, 
  Navigate, Route, Routes, Link } from 'react-router-dom'
import Notification from './components/Notification'
import theme from './theme'
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

const App = () => {
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState(null)

  const handleNotification = (message, status) => {
    setErrorMessage(message)
    setNotificationStatus(status)
    setTimeout(() => {
      setErrorMessage(null)
      setNotificationStatus(null)
    }, 5000)
  }

  return (
    <ChakraProvider theme={theme}>
      <Notification message={errorMessage} status={notificationStatus}/>
      <ColorModeSwitcher />
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupForm handleNotification={handleNotification} />} />
          <Route path="/login" element={<LoginForm />}/>
          <Route path="/" 
          element={user
            ? <SpotifyNowPlaying />
            : <LoginForm /> 
          }/>
        </Routes>
      </Router>
    </ChakraProvider>
    )
  }
  
  export default App