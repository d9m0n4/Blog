import { AuthReducer } from './slices/auth';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { postsReducer } from './slices/post';

const store = configureStore({
  reducer: { posts: postsReducer, auth: AuthReducer },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
