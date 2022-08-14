import { IComment } from './../../models/index';
import { IPost } from '../../models/index';
import { fetchAllPosts, fetchPostsByTag, getTags, searchPosts } from '../actions/post';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  items: IPost[] | [];
  tags: any;
  isLoading: boolean;
  error: any;
};

type ActionPayload = {
  id: string;
  comment: IComment;
};

const initialState: SliceState = {
  items: [] as IPost[],
  tags: [],
  isLoading: false,
  error: null,
};

const addComment: CaseReducer<SliceState, PayloadAction<ActionPayload>> = (state, action) => {
  state.items = state.items.map((item) => {
    if (item.id === action.payload.id) {
      item.comments.unshift(action.payload.comment);
      return item;
    } else {
      return item;
    }
  });
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addComment,
  },
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
    [searchPosts.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
      state.items = [];
    },
    [searchPosts.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.items = [];
    },
    [searchPosts.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
  },
});

export const postsReducer = postSlice.reducer;
export const postActions = postSlice.actions;
