import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import ProductItems from "../../db/ProductItems";
// // import productItems from "../../TestData";

// console.log(ProductItems())
// const data = JSON.parse(localStorage.getItem("data")) || {};

const initialState = {
  productData: [],
  isLoading: true,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    fetchData: (state, action) => {
      state.productData = action.payload;
    },
  },
});
// console.log(productSlice)

export const { fetchData } = productSlice.actions;
export default productSlice.reducer;
