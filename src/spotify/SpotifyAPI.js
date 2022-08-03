// import querystring from "querystring";
import axios from 'axios'
import {Buffer} from 'buffer';

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN;


//https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
//If the user accepted your request, then your app is ready to exchange the authorization code for an Access Token. It can do this by making a POST request to the /api/token endpoint.
// async function to create b64 encoded string and do a post request to token endpoint
// returns access token
const getAccessToken = async () => {
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        // body: querystring.stringify({
        //     grant_type: "refresh_token",
        //     refresh_token,
        // }),
        body: new URLSearchParams([
          ['grant_type', 'refresh_token'],
          ['refresh_token',refresh_token]
        ]).toString(),
    });
    // console.log(response.json())
    // const config = {
    //   headers: {
    //     Authorization: `Basic ${basic}`,
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   }
    // }

    // const data = new URLSearchParams([
    //   ['grant_type', 'refresh_token'],
    //   ['refresh_token',refresh_token]
    // ]).toString()

    // const response2 = await axios.post(TOKEN_ENDPOINT, data, config)
    // console.log(response2)
    // console.log(response2)
    return response.json();
};

// uses access token in above function to fetch from now playing endpoint
// with authorization headers
export const getNowPlaying = async (client_id, client_secret, refresh_token) => {
  const { access_token } = await getAccessToken(
      client_id,
      client_secret,
      refresh_token
  );
  return fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
          Authorization: `Bearer ${access_token}`,
      },
  });
};


export default async function getNowPlayingItem(
  client_id,
  client_secret,
  refresh_token
) {
  const response = await getNowPlaying(client_id, client_secret, refresh_token);
  if (response.status === 204 || response.status > 400) {
      return false;
  }
  const song = await response.json();
  // console.log(song)
  const albumImageUrl = song.item.album.images[0].url;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const isPlaying = song.is_playing;
  const songUrl = song.item.external_urls.spotify;
  const title = song.item.name;
  
  // console.log(song, artist)
  return {
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
  };
}
