import axios from 'axios'
import { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import { currentUserActions, currentUserData } from '../reduxToolkit';

export function spotifyApi(){
    const spotifyWebApi = new SpotifyWebApi();

    return spotifyWebApi;
}

export function checkStatusCode(status: number, dispatch: Dispatch<any>){ 
    if(status === 401){
        dispatch(currentUserActions.userExpired(true));
    }
}