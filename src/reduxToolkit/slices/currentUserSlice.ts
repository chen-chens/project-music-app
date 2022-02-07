import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CurrentUserType {
    userData: any[]|null;
    token: string|null;
    expired: boolean;

}

const initialState: CurrentUserType = {
    userData: null,
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
        getUserData: (state, action: PayloadAction<any[]|null>) => {
            state.userData = action.payload;
        },
        logout: (state) => {
            state = initialState;
        }
    }
});

export const slecterToken = (state: RootState) => state.currentUser.token;