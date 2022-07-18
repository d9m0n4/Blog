import { IPost } from '../../models/index';
import { fetchAllPosts, fetchPostsByTag, getTags } from '../actions/post';
import { createSlice } from '@reduxjs/toolkit';

type SliceState = {
  items: IPost[] | [];
  tags: any;
  isLoading: boolean;
  error: any;
};

const initialState: SliceState = {
  items: [],
  tags: [],
  isLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllPosts.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
      state.items = [];
    },
    [fetchAllPosts.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.items = [];
    },
    [fetchAllPosts.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchPostsByTag.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
      state.items = [];
    },
    [fetchPostsByTag.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.items = [];
    },
    [fetchPostsByTag.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [getTags.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
      state.tags = [];
    },
    [getTags.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.tags = [];
    },
    [getTags.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.tags = action.payload;
    },
  },
});

export const postsReducer = postSlice.reducer;
