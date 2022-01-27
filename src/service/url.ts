import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js';

export const spotifyRequest = axios.create({
    baseURL: 'https://api.spotify.com',
    timeout: 1000, // 限制請求時間，超時 server res 401
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer {token}`
    }
});

const spotifyWebApi = new SpotifyWebApi();
// spotifyWebApi.setAccessToken();

