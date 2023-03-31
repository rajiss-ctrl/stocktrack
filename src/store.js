import { configureStore } from "@reduxjs/toolkit";
import productReducer from './features/product/productSlice';
import businessProReducer from './features/businessprofile/businessSlice';
import modalReducer from './features/modalSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
    // reducer control the state in the slice
    reducer:{
        // calling it product Reducer
        user: userReducer,
        product: productReducer,
        buz: businessProReducer
    },
});