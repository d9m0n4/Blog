import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'Posts',
  initialState,
  reducers: {},
});

export const postsReducer = postSlice.reducer;
