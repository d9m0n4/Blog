import { updateUserInfo } from './../actions/user';
import { IUser } from './../../models/index';
import { checkAuth, login, logout } from './../actions/auth';
import { createSlice } from '@reduxjs/toolkit';

interface IAuth {
  user: IUser;
  isAuth: boolean;
  error: { message: string | null };
  loading: boolean;
}

const initialState: IAuth = {
  user: {} as IUser,
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
      state.user = {} as IUser;
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
      state.user = {} as IUser;
    },

    [checkAuth.pending.type]: (state) => {
      state.error = { message: null };
      state.loading = true;
      state.user = {} as IUser;
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
      state.user = {} as IUser;
    },

    [logout.pending.type]: (state) => {
      state.error = { message: null };
      state.loading = true;
      state.isAuth = false;
      state.user = {} as IUser;
    },
    [logout.fulfilled.type]: (state) => {
      state.error = { message: null };
      state.loading = false;
      state.user = {} as IUser;
      state.isAuth = false;
    },
    [logout.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.user = {} as IUser;
    },

    [updateUserInfo.pending.type]: (state) => {
      state.error = { message: null };
      state.loading = true;
      state.user = {} as IUser;
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
      state.user = {} as IUser;
    },
  },
});

export const AuthReducer = authSlice.reducer;
