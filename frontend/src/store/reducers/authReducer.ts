import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User;
  isAuthenticated: boolean;
}

// Retrieve authentication state from localStorage (if exists)
const storedUser = localStorage.getItem("user");
const storedAuth = localStorage.getItem("isAuthenticated") === "true";

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : { 
    id: "", email: "", name: "", accessToken: "", refreshToken: "" 
  },
  isAuthenticated: storedAuth,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("isAuthenticated", "true");
    },
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    logoutUser: (state) => {
      state.user = { id: "", email: "", name: "", accessToken: "", refreshToken: "" };
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("isAuthenticated");
    },
    refreshToken: (state, action) => {
      state.user.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
  },
});

export const { createUser, loginUser, logoutUser, refreshToken } = authSlice.actions;
export default authSlice.reducer;
