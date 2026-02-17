import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authReducer } from '../../features/auth/authSlice';
import { cartReducer } from '../../features/cart/cartSlice';
import { catalogReducer } from '../../features/catalog/catalogSlice';
import { ordersReducer } from '../../features/orders/ordersSlice';
import { loadCartItems, saveCartItems } from '../../shared/lib/cartStorage';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    catalog: catalogReducer,
    cart: cartReducer,
    orders: ordersReducer
  },
  preloadedState: {
    cart: {
      items: loadCartItems()
    }
  }
});

store.subscribe(() => {
  saveCartItems(store.getState().cart.items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
