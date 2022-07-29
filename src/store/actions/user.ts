import { createAsyncThunk } from '@reduxjs/toolkit';
import users from 'service/users';

export const fetchUsers = createAsyncThunk('users/getPopular', async (_, { rejectWithValue }) => {
  try {
    const { data } = await users.getUsers();
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateUserInfo = createAsyncThunk(
  'users/updateInfo',
  async (postData: any, { rejectWithValue }) => {
    try {
      const { data } = await users.updateUserInfo(postData.formData, postData.formD);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
