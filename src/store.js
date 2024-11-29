import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice';
import productReducer from './features/product/productSlice';
import businessProReducer from './features/businessprofile/businessSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    buz: businessProReducer,
  },
});
