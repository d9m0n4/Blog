import { IUser } from './../../models/index';
import { checkAuth, login } from './../actions/auth';
import { createSlice } from '@reduxjs/toolkit';

interface IAuth {
  user: IUser | null;
  error: { message: string | null };
  loading: boolean;
}

const initialState: IAuth = {
  user: null,
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
    },
    [checkAuth.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.user = null;
    },
  },
});

export const AuthReducer = authSlice.reducer;
