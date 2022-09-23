import { DEFAULT_PAGE } from './../../constants/index';
import { IComment } from './../../models/index';
import { IPost } from '../../models/index';
import { fetchAllPosts, fetchPostsByTag, getPostById, getTags, searchPosts } from '../actions/post';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  items: IPost[] | [];
  currentPage: number;
  currentPost: IPost | null;
  count: number;
  tags: [];
  isLoading: boolean;
  error: { message: string | null; errors: [] };
};

const initialState: SliceState = {
  items: [] as IPost[],
  currentPage: DEFAULT_PAGE,
  currentPost: null,
  count: 0,
  tags: [],
  isLoading: false,
  error: { message: null, errors: [] },
};

const addComment: CaseReducer<SliceState, PayloadAction<IComment>> = (state, action) => {
  state.currentPost?.comments.unshift(action.payload);
};

const setCurrentPage: CaseReducer<SliceState, PayloadAction<number>> = (state, action) => {
  state.currentPage = action.payload;
};

const setError: CaseReducer<SliceState, PayloadAction<string | null>> = (state, action) => {
  state.error.message = action.payload;
};

const setLoading: CaseReducer<SliceState, PayloadAction<boolean>> = (state, action) => {
  state.isLoading = action.payload;
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addComment,
    setCurrentPage,
    setError,
    setLoading,
  },
  extraReducers: {
    [fetchAllPosts.pending.type]: (state) => {
      state.isLoading = true;
      state.error = { message: null, errors: [] };
      state.items = [];
    },
    [fetchAllPosts.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.items = [];
    },
    [fetchAllPosts.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = { message: null, errors: [] };
      state.items = action.payload.posts;
      state.count = action.payload.count;
    },

    [fetchPostsByTag.pending.type]: (state) => {
      state.isLoading = true;
      state.error = { message: null, errors: [] };
      state.items = [];
    },
    [fetchPostsByTag.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.items = [];
    },
    [fetchPostsByTag.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = { message: null, errors: [] };
      state.items = action.payload;
      state.count = 0;
    },

    [getPostById.pending.type]: (state) => {
      state.isLoading = true;
      state.error = { message: null, errors: [] };
      state.currentPost = null;
    },
    [getPostById.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.currentPost = null;
    },
    [getPostById.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = { message: null, errors: [] };
      state.currentPost = action.payload;
    },

    [getTags.pending.type]: (state) => {
      state.isLoading = true;
      state.error = { message: null, errors: [] };
      state.tags = [];
    },
    [getTags.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.tags = [];
    },
    [getTags.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = { message: null, errors: [] };
      state.tags = action.payload;
    },

    [searchPosts.pending.type]: (state) => {
      state.isLoading = true;
      state.error = { message: null, errors: [] };
      state.items = [];
    },
    [searchPosts.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.items = [];
    },
    [searchPosts.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = { message: null, errors: [] };
      state.items = action.payload.posts;
    },
  },
});

export const postsReducer = postSlice.reducer;
export const postActions = postSlice.actions;
