import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataType } from "../../type/userDataType";


interface CurrentUserType {
    userPlayLists: UserDataType[];
    token: string|null;
    expired: boolean;
}

const initialState: CurrentUserType = {
    userPlayLists: [{id: "1", name: "我的播放清單 #1", playList:[]}],
    token: null,
    expired: true
}

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        getToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        userExpired: (state) => {
            state.expired = true;
        },
        userNotExpired: (state) => {
            state.expired = false;
        },
        logout: (state) => {
            state = initialState;
        },
        getUserData: (state, action: PayloadAction<UserDataType[]>) => {
            state.userPlayLists = action.payload;
        },
        createUserData: (state, action: PayloadAction<UserDataType>) => {
            state.userPlayLists = [...state.userPlayLists, action.payload];
        },
        updateUserData: (state, action: PayloadAction<UserDataType[]>) => {
            state.userPlayLists = action.payload;
        },
    }
});
