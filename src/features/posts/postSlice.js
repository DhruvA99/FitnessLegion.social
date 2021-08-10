import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  postData: {},
  error: "",
};

const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPost",
  async (thunkAPI) => {
    const response = await axios.get("/posts/");
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postSlice.reducer;
