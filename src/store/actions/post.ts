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

export const fetchPostsByTag = createAsyncThunk(
  'posts/getByTag',
  async (tag: string, { rejectWithValue }) => {
    try {
      const { data } = await PostService.fetchPostsByTag(tag);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getTags = createAsyncThunk('posts/getTags', async (_, { rejectWithValue }) => {
  try {
    const { data } = await PostService.getTags();

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const searchPosts = createAsyncThunk(
  'posts/searchPosts',
  async (query: string, { rejectWithValue }) => {
    try {
      const { data } = await PostService.searchPosts(query);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
