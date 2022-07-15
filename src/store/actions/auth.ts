import { IUserPostData, IErrorResponse } from './../../types/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from 'service/auth';
import { AxiosError } from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async (postData: IUserPostData, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.login(postData);
      return data;
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
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error);
    }
  },
);
