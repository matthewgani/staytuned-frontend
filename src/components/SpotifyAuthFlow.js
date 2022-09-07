import { Text, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Buffer} from "buffer";

const SpotifyAuthFlow = ({user, spotifyLoggedIn, handleNotification, handleRefreshToken}) => {
  const navigate = useNavigate()
  const [code, setCode] = useState(null)


  // const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const CLIENT_ID = 'bec5e86c0c3c4e31ae344c6e10e50a03'; // insert your client id here from spotify
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/spotifyAuth";
  const SPACE_DELIMITER = "%20";
  const SCOPES = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-top-read",
    "user-read-recently-played"
  ];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'


  const getRefreshToken = async (code) => {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
    
    // header parameter
    const config = {
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }
    
    // request body parameter
    // redirect uri is just for validation, wont be redirected
    const data = new URLSearchParams([
      ['grant_type', 'authorization_code'],
      ['code',code],
      ['redirect_uri', REDIRECT_URL_AFTER_LOGIN]
    ]).toString()

    const response = await axios.post(SPOTIFY_TOKEN_ENDPOINT, data, config)
    handleRefreshToken(response.data)
    handleNotification('Successfully retrieved refresh token!', 'success')
    navigate('/')

  }

  useEffect(() => {
    // if the user already has a refresh token (maybe stored from jwt?)
    // we can redirect away from this page in case they end up here


    if (spotifyLoggedIn) {
      navigate('/home')
    } 

    const queryParams = new URLSearchParams(window.location.search)
    const code = queryParams.get('code')
    const state = queryParams.get('state')


    //state checking is optional
    // console.log(code, state)
    if (code && state) {
      if (state !== '586') {
        handleNotification('There was an error when authenticating, please try again', 'error')
        navigate('/spotifyAuth')
      }
      else {
        setCode(code)
        // window.localStorage.setItem('code', code)
        // used for requesting access token for first time to get refresh token
        // maybe i usestate for this code.
        // or just start the next function to get the refresh token

      }
    }

  // if no code and no state in URL, we dont do anything.


  }, [handleNotification, navigate, user, spotifyLoggedIn])



  const handleSpotifyLogin = () => {
    // set show dialog to false after testing is done
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=code&show_dialog=true&state=586`;
  }

  return (
    <div>
      <Text>
        Welcome to the spotify authentication page! Follow instructions below to log into your spotify account.
      </Text>
      {code 
      ? <Button onClick={() => getRefreshToken(code)}>Get refresh token!</Button>
      :<Button onClick={handleSpotifyLogin}> Authenticate account!</Button>
      }


    </div>
  )


}


export default SpotifyAuthFlow