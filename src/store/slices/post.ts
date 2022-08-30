import { DEFAULT_PAGE } from './../../constants/index';
import { IComment } from './../../models/index';
import { IPost } from '../../models/index';
import { fetchAllPosts, fetchPostsByTag, getTags, searchPosts } from '../actions/post';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  items: IPost[] | [];
  currentPage: number;
  count: number;
  tags: any;
  isLoading: boolean;
  error: string | null;
};

type ActionPayload = {
  id: string;
  comment: IComment;
};

const initialState: SliceState = {
  items: [] as IPost[],
  currentPage: DEFAULT_PAGE,
  count: 0,
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

const setCurrentPage: CaseReducer<SliceState, PayloadAction<number>> = (state, action) => {
  state.currentPage = action.payload;
};

const setError: CaseReducer<SliceState, PayloadAction<any>> = (state, action) => {
  state.error = action.payload;
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addComment,
    setCurrentPage,
    setError,
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
      state.items = action.payload.posts;
      state.count = action.payload.count;
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
      state.count = 0;
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
      state.items = action.payload.posts;
    },
  },
});

export const postsReducer = postSlice.reducer;
export const postActions = postSlice.actions;
