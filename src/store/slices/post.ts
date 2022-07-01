import { IPost } from './../../types/index';
import { fetchAllPosts } from './../actionCreators/post';
import { createSlice } from '@reduxjs/toolkit';

type SliceState = {
  items: IPost[] | [];
  isLoading: boolean;
  error: any;
};

const initialState: SliceState = {
  items: [],
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
  },
});

export const postsReducer = postSlice.reducer;
