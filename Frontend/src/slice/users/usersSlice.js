import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USER_URL ="http://localhost:3000/users";


export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try{
    const response = await axios.get(USER_URL);
    console.log(response.data)
    return response.data;
  }catch(err){
    throw err;
  }

});


// Async thunk to add posts
export const addUser = createAsyncThunk("users/addUser", async (newPost) => {
  const response = await axios.post(POST_URL, newPost);
  console.log(newPost)
  return response.data;
});

// Async thunk to edit posts
export const editPost = createAsyncThunk("userss/editUser", async (updatePost) => {
  const { _id } = updatePost;
  const response = await axios.put(`${POST_URL}/${_id}`, updatePost);
  return response.data;
});

// Async thunk to delete posts
export const deletePost = createAsyncThunk("posts/deletePost", async (removePost) => {
  const { _id  } = removePost;
  const response = await axios.delete(`${POST_URL}/${_id}`);
  if (response.status === 200) return removePost;
});




const initialState = {
  users: [],
  status:"idle",
  error:null,
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
    builder
    .addCase(fetchUsers.pending,(state)=>{
      state.status="loading";
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status="succeeded";
        state.users = action.payload;
    })
    .addCase(fetchUsers.rejected,(state)=>{
      state.status="rejected"
      state.error=action.error.message;
    })
}
}
)



export default usersSlice.reducer;
export const selectAllUsers =(state)=>state.users.users;