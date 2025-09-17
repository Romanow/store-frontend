import {createSlice} from "@reduxjs/toolkit";
import {initialState} from "./types.ts";

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        openAuthModal: (state) => {
            state.authModalOpen = true;
        },
        closeAuthModal: (state) => {
            state.authModalOpen = false;
        },
    },
});

export const {openAuthModal, closeAuthModal} = uiSlice.actions;
export default uiSlice.reducer;
