import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  postData: [],
  error: "",
};

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPost",
  async (_, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      const response = await axios.get("/posts/", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId: userId,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
    [fetchAllPosts.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.postData = payload.postData;
      state.error = "";
    },
    [fetchAllPosts.rejected]: (state, { payload, meta }) => {
      if (meta.requestId !== state.currentRequestId) {
        state.status = "failed";
        state.error = payload.message;
      }
    },
  },
});

export default postSlice.reducer;
