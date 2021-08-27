import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate } from "react-router";

const initialState = {
  status: "idle",
  authToken: null,
  userId: null,
  profileImageURL: "",
  username: "",
  error: "",
  currentRequestId: "",
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("auth/login", userData);
      localStorage.setItem("authToken", response.data.authToken);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("profileImageURL", response.data.profileImageURL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("auth/signup", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("profileImageURL");
      state.authToken = null;
      state.userId = null;
      state.username = "";
      state.error = "";
      state.profileImageURL = "";
    },
    checkAuthState: (state) => {
      let authToken = localStorage.getItem("authToken");
      let userId = localStorage.getItem("userId");
      let username = localStorage.getItem("username");
      let profileImageURL = localStorage.getItem("profileImageURL");
      if (authToken && userId) {
        state.authToken = authToken;
        state.userId = userId;
        state.username = username;
        state.profileImageURL = profileImageURL;
      }
    },
    setProfileImage: (state, action) => {
      localStorage.setItem("profileImageURL", action.payload);
      state.profileImageURL = action.payload;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, { payload, meta }) => {
      if (meta.requestId !== state.currentRequestId.requestId) {
        state.status = "success";
        state.authToken = payload.authToken;
        state.userId = payload.userId;
        state.username = payload.username;
        state.profileImageURL = payload.profileImageURL;
        state.currentRequestId = "";
      }
    },
    [loginUser.rejected]: (state, { payload, meta }) => {
      if (meta.requestId !== state.currentRequestId) {
        state.status = "failed";
        state.error = payload.message;
        state.currentRequestId = meta.requestId;
      }
    },
  },
});

export const { logoutUser, checkAuthState, setProfileImage } =
  authSlice.actions;

export default authSlice.reducer;
