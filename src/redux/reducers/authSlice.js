import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  authToken: null,
  userId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
