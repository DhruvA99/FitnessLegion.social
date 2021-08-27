import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  postData: [],
  error: "",
  post: null,
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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPost = createAsyncThunk("posts/fetchPost");

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      const response = await axios.post("/posts/", data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId: userId,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (data, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      const response = await axios.delete(
        "/posts/",

        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId: userId,
          },
          data: { postId: data.postId },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (data, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        `/posts/like/${data.postId}`,
        {
          username: data.username,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId: userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unlikePost = createAsyncThunk(
  "posts/unlikePost",
  async (data, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      console.log(userId);
      const response = await axios.post(
        `/posts/unlike/${data.postId}`,
        {
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId: userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (data, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      const response = await axios.delete(`/posts/comment/${data.postId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId: userId,
        },
        data: { commentId: data.commentId },
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
    [addPost.pending]: (state) => {
      state.status = "loading";
      state.error = "";
    },
    [addPost.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.postData = payload.postData;
      state.error = "";
    },
    [addPost.rejected]: (state, { payload, meta }) => {
      if (meta.requestId !== state.currentRequestId) {
        state.status = "failed";
        state.error = payload.message;
      }
    },
    [deletePost.pending]: (state) => {
      state.status = "loading";
      state.error = "";
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.postData = payload.postData;
      state.error = "";
    },
    [deletePost.rejected]: (state, { payload, meta }) => {
      if (meta.requestId !== state.currentRequestId) {
        console.log(payload);
        state.status = "failed";
        state.error = payload.errorMessage;
      }
    },
    [likePost.pending]: (state) => {
      state.status = "loading";
      state.error = "";
    },
    [likePost.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.error = "";
      state.postData = payload.postData;
    },
    [likePost.rejected]: (state, { payload, meta }) => {
      if (meta.requestId !== state.currentRequestId) {
        state.status = "failed";
        state.error = payload.message;
      }
    },
    [unlikePost.pending]: (state) => {
      state.status = "loading";
      state.error = "";
    },
    [unlikePost.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.error = "";
      state.postData = payload.postData;
    },
    [unlikePost.rejected]: (state, { payload, meta }) => {
      if (meta.requestId !== state.currentRequestId) {
        state.status = "failed";
        state.error = payload.message;
      }
    },
    [deleteComment.pending]: (state) => {
      state.status = "loading";
      state.error = "";
    },
    [deleteComment.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.postData = payload.postData;
      state.error = "";
    },
    [deleteComment.rejected]: (state, { payload, meta }) => {
      if (meta.requestId !== state.currentRequestId) {
        console.log(payload);
        state.status = "failed";
        state.error = payload.errorMessage;
      }
    },
  },
});

export const { likePostLocal } = postSlice.actions;

export default postSlice.reducer;
