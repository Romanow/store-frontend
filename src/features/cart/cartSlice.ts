import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemInfo } from '../../shared/api/types';

interface CartState {
  items: ItemInfo[];
}

const initialState: CartState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ItemInfo>) {
      state.items.push(action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    removeCartItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((_, index) => index !== action.payload);
    }
  }
});

export const { addToCart, clearCart, removeCartItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
