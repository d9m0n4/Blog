import { createAsyncThunk } from '@reduxjs/toolkit';
import users from 'service/users';

export const fetchUsers = createAsyncThunk('users/getPopular', async (_, { rejectWithValue }) => {
  try {
    const { data } = await users.getUsers();
    console.log(data);

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
