import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
 // Import for date manipulation

const POST_URL = "http://localhost:3000/posts";

const USER_URL ="http://localhost:3000/users";

// Create the post entity adapter
const postAdapter = createEntityAdapter({
  selectId: (post) => post._id, // Define how to select the ID for each entity
});

const initialState = postAdapter.getInitialState({
  status: "idle",
  error: null
});



// Async thunk to fetch posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POST_URL);
  return response.data;
});

// Async thunk to add posts
export const addPost = createAsyncThunk("posts/addPost", async (newPost) => {
  const response = await axios.post(POST_URL, newPost);
  console.log(newPost)
  return response.data;
});

// Async thunk to edit posts
export const editPost = createAsyncThunk("posts/editPost", async (updatePost) => {
  const { id } = updatePost;
  const response = await axios.put(`${POST_URL}/${id}`, updatePost);
  return response.data;
});

// Async thunk to delete posts
export const deletePost = createAsyncThunk("posts/deletePost", async (removePost) => {
  const { id  } = removePost;
  const response = await axios.delete(`${POST_URL}/${id}`);
  if (response.status === 200) return removePost;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        postAdapter.setAll(state, action.payload); // Use postAdapter to set all posts
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(addPost.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        postAdapter.addOne(state, action.payload); // Server generates ID, so add directly
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const updatedPost = action.payload;
        updatedPost.time = new Date().toISOString();
        postAdapter.updateOne(state, {
          id: updatedPost.id, // Correct structure for updateOne
          changes: updatedPost,
        });
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const { id } = action.payload;
        postAdapter.removeOne(state, id); // Correct way to remove a post by its ID
      });
  }
});

export const { reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;

// Post selectors
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
} = postAdapter.getSelectors((state) => state.posts);

// Selector to filter posts by a specific user ID
export const postsFilterByUsers = createSelector(
  [selectAllPosts, (state, author) => author],
  (posts,author) => posts.filter((post) => post.name == author) // Filter posts by userId
);
