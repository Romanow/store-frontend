import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { readUserFromJwt } from '../../shared/lib/auth';

interface AuthState {
  isAuthenticated: boolean;
  name: string;
  picture?: string;
  isAuthModalOpen: boolean;
}

const jwtUser = readUserFromJwt();

const initialState: AuthState = {
  isAuthenticated: Boolean(jwtUser?.name),
  name: jwtUser?.name ?? 'Guest',
  picture: jwtUser?.picture,
  isAuthModalOpen: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshAuthFromToken(state) {
      const user = readUserFromJwt();
      state.isAuthenticated = Boolean(user?.name);
      state.name = user?.name ?? 'Guest';
      state.picture = user?.picture;
    },
    openAuthModal(state) {
      state.isAuthModalOpen = true;
    },
    closeAuthModal(state) {
      state.isAuthModalOpen = false;
    },
    setAuthenticatedUser(state, action: PayloadAction<{ name: string; picture?: string }>) {
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.picture = action.payload.picture;
    }
  }
});

export const { refreshAuthFromToken, openAuthModal, closeAuthModal, setAuthenticatedUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
