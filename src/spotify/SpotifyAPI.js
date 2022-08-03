// import querystring from "querystring";
import axios from "axios"
import {Buffer} from "buffer";

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN;


const getAccessToken = async () => {
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
    
    // header paremeter
    const config = {
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }
    
    // request body parameter
    const data = new URLSearchParams([
      ['grant_type', 'refresh_token'],
      ['refresh_token',refresh_token]
    ]).toString()

    const response = await axios.post(TOKEN_ENDPOINT, data, config)
    return response.data;
};

// uses access token in above function to fetch from now playing endpoint
// with authorization headers
const getNowPlaying = async (client_id, client_secret, refresh_token) => {
  const { access_token } = await getAccessToken(
      client_id,
      client_secret,
      refresh_token
  );
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  const response = await axios.get(NOW_PLAYING_ENDPOINT, config)

  return response
};


const getNowPlayingItem = async (client_id, client_secret,refresh_token) => {
  const response = await getNowPlaying(client_id, client_secret, refresh_token);
  if (response.status === 204 || response.status > 400) {
      return false;
  }

  const song = response.data
  const albumImageUrl = song.item.album.images[0].url;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const isPlaying = song.is_playing;
  const songUrl = song.item.external_urls.spotify;
  const title = song.item.name;
  
  return {
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
  };
}

const SpotifyAPI = {
  getNowPlayingItem
}
export default SpotifyAPI
