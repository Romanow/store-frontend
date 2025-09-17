import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../features/api/apiSlice";
import {cartSlice} from "../features/cart/cartSlice";
import {authSlice} from "../features/auth/authSlice";
import {uiSlice} from "../features/ui/uiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSlice.reducer,
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
