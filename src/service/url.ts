import axios from 'axios'
import { Dispatch } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { currentUserActions } from '../reduxToolkit';

export function spotifyApi(){
    const spotifyWebApi = new SpotifyWebApi();

    return spotifyWebApi;
}

export function checkStatusCode(status: number, dispatch: Dispatch<any>){ 
    if(status === 401){
        dispatch(currentUserActions.logout());
    }
}