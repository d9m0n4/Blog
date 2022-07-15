import { IUser } from './../../types/index';
import { login } from './../actions/auth';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: { message: null },
  loadig: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending.type]: (state) => {
      state.error = { message: null };
      state.loadig = true;
      state.user = null;
    },
    [login.fulfilled.type]: (state, action) => {
      state.error = { message: null };
      state.loadig = false;
      state.user = action.payload;
    },
    [login.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loadig = false;
      state.user = null;
    },
  },
});

export const AuthReducer = authSlice.reducer;
