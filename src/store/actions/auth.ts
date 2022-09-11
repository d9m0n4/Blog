import { IUserPostData } from '../../models/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from 'service/auth';
import { AxiosError } from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async (postData: IUserPostData, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.login(postData);
      localStorage.setItem('token', data.accessToken);
      return data.userData;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue(error);
    }
  },
);

export const registration = createAsyncThunk(
  'auth/registration',
  async (postData: IUserPostData, { rejectWithValue }) => {
    try {
      const data = await AuthService.registration(postData);
      return data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error);
    }
  },
);

export const checkAuth = createAsyncThunk('auth/check', async (_, { rejectWithValue }) => {
  try {
    const { data } = await AuthService.refreshToken();
    localStorage.setItem('token', data.accessToken);
    return data.userData;
  } catch (error) {
    if (error instanceof AxiosError) {
      window.localStorage.removeItem('token');
      return rejectWithValue(error.response?.data);
    }
    return rejectWithValue(error);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    window.localStorage.removeItem('token');
    return await AuthService.logout();
  } catch (error) {
    return rejectWithValue(error);
  }
});
