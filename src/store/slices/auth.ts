import { updateUserInfo } from './../actions/user';
import { IUser } from './../../models/index';
import { checkAuth, login, logout } from './../actions/auth';
import { createSlice } from '@reduxjs/toolkit';

interface IAuth {
  user: IUser | null;
  isAuth: boolean;
  error: { message: string | null };
  loading: boolean;
}

const initialState: IAuth = {
  user: null,
  isAuth: false,
  error: { message: '' },
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending.type]: (state) => {
      state.error = { message: null };
      state.loading = true;
      state.user = null;
    },
    [login.fulfilled.type]: (state, action) => {
      state.error = { message: null };
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
    [login.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.user = null;
    },

    [checkAuth.pending.type]: (state) => {
      state.error = { message: null };
      state.loading = true;
      state.user = null;
    },
    [checkAuth.fulfilled.type]: (state, action) => {
      state.error = { message: null };
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
    [checkAuth.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.user = null;
    },

    [logout.pending.type]: (state) => {
      state.error = { message: null };
      state.loading = true;
      state.isAuth = false;
      state.user = null;
    },
    [logout.fulfilled.type]: (state) => {
      state.error = { message: null };
      state.loading = false;
      state.user = null;
      state.isAuth = false;
    },
    [logout.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.user = null;
    },

    [updateUserInfo.pending.type]: (state) => {
      state.error = { message: null };
      state.loading = true;
      state.user = null;
      state.isAuth = false;
    },
    [updateUserInfo.fulfilled.type]: (state, action) => {
      state.error = { message: null };
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
    [updateUserInfo.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.user = null;
    },
  },
});

export const AuthReducer = authSlice.reducer;
