import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  postData: {},
  error: "",
};

const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPost",
  async (thunkAPI) => {
    try {
      const response = await axios.get("/posts/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue([], error);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllPosts.pending]: (state) => {
      state.status = "loading";
      state.error = "";
    },
    [fetchAllPosts.fullfilled]: (state, payload) => {
      state.status = "success";
      state.postData = payload;
      state.error = "";
    },
    [fetchAllPosts.rejected]: (state, { payload, error }) => {
      state.status = "failed";
      state.error = error.message;
    },
  },
});

export default postSlice.reducer;
