import { createAsyncThunk } from '@reduxjs/toolkit';
import PostService from 'service/posts';

export const fetchAllPosts = createAsyncThunk('posts/getAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await PostService.getAll();

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
