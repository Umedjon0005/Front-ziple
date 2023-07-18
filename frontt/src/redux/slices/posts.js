import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('chat/fetchPosts', async () => {
    const { data}  = await axios.get('/chat');
    return data;
});

export const fetchRemovePost = createAsyncThunk('chat/fetchRemovePost', async (id) => 
    axios.delete(`/chat/${id}`),
);

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
        },
    },
})

export const postsReducer = postsSlice.reducer;