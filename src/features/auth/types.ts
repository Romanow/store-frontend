export interface AuthState {
    accessToken: string | null;
}

export const initialState: AuthState = {
    accessToken: null,
};
