import { login } from './../actions/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  error: {},
  loadig: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending.type]: (state) => {
      state.error = {};
      state.loadig = true;
      state.user = {};
    },
    [login.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.error = {};
      state.loadig = false;
      state.user = action.payload;
    },
    [login.rejected.type]: (state, action: PayloadAction<Object>) => {
      state.error = action.payload;
      state.loadig = false;
      state.user = {};
    },
  },
});

export const AuthReducer = authSlice.reducer;
