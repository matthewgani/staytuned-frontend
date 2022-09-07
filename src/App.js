import { useState, useEffect } from 'react'
import SpotifyNowPlaying from "./spotify/SpotifyNowPlaying"
import { ChakraProvider, Flex, Spacer } from "@chakra-ui/react"
import {
  BrowserRouter as Router, 
  Navigate, Route, Routes, Link, useNavigate } from 'react-router-dom'
import Notification from './components/Notification'
import theme from './theme'
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import commentService from './services/comments'
import loginService from './services/login'
import { Button } from '@chakra-ui/react'
import spotifyService from './services/spotify'
import SpotifyAuthFlow from './components/SpotifyAuthFlow'

const App = () => {

  // const isLoggedIn = window.localStorage.getItem('loggedStayTunedUser') !== null;
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState(null)
  const [spotifyLoggedIn, setSpotifyLoggedIn] = useState(false)
  const [refreshToken, setRefreshToken] = useState(null)
  
  const navigate = useNavigate()

  const handleNotification = (message, status) => {
    setErrorMessage(message)
    setNotificationStatus(status)
    setTimeout(() => {
      setErrorMessage(null)
      setNotificationStatus(null)
    }, 5000)
  }


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedStayTunedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      commentService.setToken(user.token)
      // spotifyService.setRefreshToken(user.refreshToken)
    }
    else {
      // check sessionStorage
      const loggedUserJSON = window.sessionStorage.getItem('loggedStayTunedUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        commentService.setToken(user.token)
        // spotifyService.setRefreshToken(user.refreshToken)
      }
    }
  }, [])

  const handleLogin = async (userObject, rememberMe) => {
    try {
      const user = await loginService.login(userObject)

      // set the JWT 
      // save to localstorage if remember me
      if (rememberMe) {
        window.localStorage.setItem(
          'loggedStayTunedUser', JSON.stringify(user)
        )
        
        // check if have refresh token, if have, set spotify logged in


      }
      else {
        // session storage so that if they refresh tab, still exists
        window.sessionStorage.setItem(
          'loggedStayTunedUser', JSON.stringify(user)
        )

      }
      commentService.setToken(user.token)

      // TODO
      // if (user.refreshToken) {
      //   spotifyService.setRefreshToken(user.refreshToken)
      // }
      setUser(user)
      
      return true

    } catch (exception) {
      handleNotification(exception.response.data.error, 'error')
      return false
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedStayTunedUser')
    window.sessionStorage.removeItem('loggedStayTunedUser')
    window.localStorage.clear()
    setUser(null)
    setRefreshToken(null)
    setSpotifyLoggedIn(false)
    navigate('/login')
  }

  const handleRefreshToken = (data) => {
    setSpotifyLoggedIn(true)
    setRefreshToken(data.refresh_token)

    // save refresh token into DB
    // userService.updateRefreshToken(user.id, data.refresh_token)

    // save refreshtoken into spotify service to use to get current song
    spotifyService.setRefreshToken(data.refresh_token)
  }

  // needs default route like path='*' to send to 404 page or redirect to home
  console.log(user)
  // console.log(isLoggedIn)
  // console.log(spotifyLoggedIn)
  // console.log((user && spotifyLoggedIn))

  return (
    <ChakraProvider theme={theme}>
      <Notification message={errorMessage} status={notificationStatus}/>
      <Flex>
        <ColorModeSwitcher />
        <Spacer />
        {user 
          ? <Button onClick={handleLogout}>Logout</Button>
          : <Button onClick={() => navigate('/login')}>Login</Button>
        }
      </Flex>
      <Routes>
        <Route path='/home' 
        element={user 
        ? <SpotifyNowPlaying handleNotification={handleNotification} user={user} refresh_token={refreshToken} />
        : <Navigate to='/login'/>
        }
        />
        <Route path="/signup" element={<SignupForm handleNotification={handleNotification} />} />
        <Route path="/login" 
        element={user
          ? <Navigate to='/home' />
          : <LoginForm handleNotification={handleNotification} handleLogin={handleLogin} />
        }/>
        {/* bug, cannot refresh in spotifyAuth page */}
        <Route path="/spotifyAuth"
        element= {
          // (user) 
          // ? (spotifyLoggedIn) 
          //   ? <Navigate to='/home'/>
          //   : <SpotifyAuthFlow handleNotification={handleNotification} handleRefreshToken={handleRefreshToken}/>
          // : <Navigate to='/login'/>

          <SpotifyAuthFlow user ={user} spotifyLoggedIn = {spotifyLoggedIn} handleNotification={handleNotification} handleRefreshToken={handleRefreshToken}/>
        }

        />
        <Route path="/" 
        element={<Navigate to='/home'/>}/>
      </Routes>
    </ChakraProvider>
    )
  }
  
  export default App