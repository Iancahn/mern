import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
// import { getDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

export const store = configureStore({
  reducer: {user: userReducer},
  // set serializalbe Check will prevent some error later?
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck:false,
  }),
});

