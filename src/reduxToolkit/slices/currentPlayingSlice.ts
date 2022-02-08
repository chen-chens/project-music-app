import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CurrentPlayingType {
    showPlayBar: boolean;
    currentPlayingItem: SpotifyApi.TrackObjectFull|null;
}

const initialState: CurrentPlayingType = {
    showPlayBar: false,
    currentPlayingItem: null
};

export const currentPlayingSlice = createSlice({
    name: "currentPlaying",
    initialState,
    reducers: {
        startPlaying: (state)=> {
            state.showPlayBar = true;
        },
        stopPlaying: (state)=> {
            return initialState;
        },
        recordPlayingData: (state, action: PayloadAction<SpotifyApi.TrackObjectFull>)=> {
            state.currentPlayingItem = action.payload;
        },
    }
});

