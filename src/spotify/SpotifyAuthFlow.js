
import { Text, Button } from "@chakra-ui/react";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

// Request User Authorization
//https://accounts.spotify.com/authorize?client_id=bec5e86c0c3c4e31ae344c6e10e50a03&response_type=code&redirect_uri=http
// %3A%2F%2Flocalhost:3000&scope=user-read-currently-playing%20


// then it will redirect us to http:localhost:3000/code=weriufhiwehfiwuef (what we set above and in spotify app settings)

// we need to get this code
// https://www.codingdeft.com/posts/react-get-query-and-url-parameters/
// from smth like this, taking url param
// const queryParams = new URLSearchParams(window.location.search)
// const code = queryParams.get('code')

// Request Access Token
// then base 64 encode the code
// then we post to https://accounts.spotify.com/api/token
// with a bunch of params TODO



// then we receive object with access token and refresh token
// then we store this refresh token into the database with the user info
// if the user has this refresh token, it means they are logged into spotify


// need to think how to handle error 404 or error 400s if it happens halfway throughout the flow
// redirect back to url??

const SpotifyAuthFlow = ({handleNotification, user}) => {
  const navigate = useNavigate()

  // const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  // const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const CLIENT_ID = 'bec5e86c0c3c4e31ae344c6e10e50a03'; // insert your client id here from spotify
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";
  const SPACE_DELIMITER = "%20";
  const SCOPES = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-top-read",
    "user-read-recently-played"
  ];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

  useEffect(() => {
    // if the user already has a refresh token (maybe stored from jwt?)
    // we can redirect away from this page in case they end up here

    const queryParams = new URLSearchParams(window.location.search)
    const code = queryParams.get('code')
    const state = queryParams.get('state')

    //state checking is optional

    if (code && state) {
      if (state !== '586') {
        handleNotification('There was an error when authenticating, please try again', 'error')
        navigate('/spotifyAuth')
      }
      else {
        const b64code = Buffer.from(code).toString('base64');
        window.localStorage.setItem('b64code', b64code)
        // used for requesting access token for first time to get refresh token
        // maybe i usestate for this code.
        // or just start the next function to get the refresh token
      }
    }

  // if no code and no state in URL, we dont do anything.


  }, [handleNotification, navigate])


  const handleSpotifyLogin = () => {
    // set show dialog to false after testing is done
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=code&show_dialog=true&state='586'`;
  }

  return (
    <div>
      <Text>
        To use StayTuned, you need to login to your spotify account!
      </Text>
      <Button onClick={handleSpotifyLogin}>
        Login to your spotify account!
      </Button>

    </div>
  )


}


export default SpotifyAuthFlow