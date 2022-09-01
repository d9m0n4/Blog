import { createAsyncThunk } from '@reduxjs/toolkit';
import { postsQuery } from 'models';
import PostService from 'service/posts';

export const fetchAllPosts = createAsyncThunk(
  'posts/getAll',
  async (query: postsQuery, { rejectWithValue }) => {
    try {
      const { data } = await PostService.getAll({ page: query.page, limit: query.limit });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

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

export const getPostById = createAsyncThunk(
  'posts/getPostById',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await PostService.getPostById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
