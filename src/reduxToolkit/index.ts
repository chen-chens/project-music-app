import { currentUserSlice } from './slices/currentUserSlice';
import { RootState } from './store';

// get value by selector function: RootState -> slice name -> state -> target key
export const currentUserData = {
    userPlayLists: (state: RootState) => state.currentUser.userPlayLists,
    token: (state: RootState) => state.currentUser.token,
    expired: (state: RootState) => state.currentUser.expired,
}

// action: { type: reducers屬性名, payload: state }
export const currentUserActions = {
    ...currentUserSlice.actions,
}

