import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './slices/itemSlice';
// import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    // users: usersReducer,
  },
});
