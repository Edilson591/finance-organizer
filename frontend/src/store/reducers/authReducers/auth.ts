import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSession, AuthState } from "./interfaceAuth";

function getStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (_error) {
    return null;
  }
}

const token = localStorage.getItem("token");
const user = getStoredUser();

const initialState: AuthState = {
  isAuthenticated: !!token,
  token: token ?? null,
  user,
};

const authSlice = createSlice({
  name: "authUsers",
  initialState,
  reducers: {
    loginAction(state, action: PayloadAction<AuthSession>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginAction, logout } = authSlice.actions;

export default authSlice.reducer;
