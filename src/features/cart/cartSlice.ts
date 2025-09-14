import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartState} from "./types";
import {Item} from "../../types";

const SERVICE_KEY = "store-frontend";

const loadFromStorage = (): CartState => {
    try {
        const raw = localStorage.getItem(SERVICE_KEY);
        if (!raw) return {items: []};
        return JSON.parse(raw) as CartState;
    } catch {
        return {items: []};
    }
}

const saveToStorage = (state: CartState) => {
    localStorage.setItem(SERVICE_KEY, JSON.stringify(state));
}

const initialState: CartState = loadFromStorage();

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<{ item: Item }>) {
            state.items.push({item: action.payload.item});
            saveToStorage(state);
        },
        removeFromCart(state, action: PayloadAction<{ uid: string }>) {
            state.items = state.items.filter((ci) => ci.item.name !== action.payload.name);
            saveToStorage(state);
        },
        clearCart(state) {
            state.items = [];
            saveToStorage(state);
        }
    },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
