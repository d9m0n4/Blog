import { BASEURL } from './../../constants/index';
import { IUserPostData } from '../../models/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from 'service/auth';
import axios, { AxiosError } from 'axios';

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
    const { data } = await axios.get(`${BASEURL}api/auth/refresh`, { withCredentials: true });
    localStorage.setItem('token', data.accessToken);
    return data.userData;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    }
    return rejectWithValue(error);
  }
});
