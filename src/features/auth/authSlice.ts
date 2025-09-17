import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./types.ts";

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        clearAuth: (state) => {
            state.accessToken = null;
        },
    },
});

export const {setAccessToken, clearAuth} = authSlice.actions;
export default authSlice.reducer;
