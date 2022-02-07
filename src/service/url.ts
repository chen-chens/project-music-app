import axios from 'axios'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import { currentUserData } from '../reduxToolkit';


// export const spotifyRequest = axios.create({
//     baseURL: 'https://api.spotify.com',
//     timeout: 1000, // 限制請求時間，超時 server res 401
//     headers: {
//         'Content-Type': 'application/json',
//         "Authorization": `Bearer {token}`
//     }
// });


export function spotifyApi(){
    const spotifyWebApi = new SpotifyWebApi();

    return spotifyWebApi;
}