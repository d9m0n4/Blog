import { IUserPostData } from './../../types/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from 'service/auth';

export const login = createAsyncThunk(
  'auth/login',
  async (postData: IUserPostData, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.login(postData);
      return data;
    } catch ({ response }) {
      return rejectWithValue(response);
    }
  },
);
