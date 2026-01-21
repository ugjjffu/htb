// store/index.ts
'use client'
import { configureStore } from '@reduxjs/toolkit';
import { reducer, initialState } from '@/reducer/HotelReservationReducer';

export const store = configureStore({
  reducer,          // = your existing reducer function
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== 'production',
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;