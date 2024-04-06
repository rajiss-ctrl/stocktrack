import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import db from "../db/firebase";

export const fetchAsyncUsers = createAsyncThunk(
  "users/fetchAsyncUsers",
  async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const items = querySnapshot.docs.map((doc) => doc.data());
    return items;
  }
);

const initialState = {
  user: [],
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    // [fetchAsyncUsers.pending]: () => {
    builder.addCase(fetchAsyncUsers.pending, (state) => {
      state.status = "Loading.....";
      // console.log("pending");
    });
    builder.addCase(fetchAsyncUsers.fulfilled, (state, action) => {
      state.status = "Successful";
      // console.log("fetch successfully!");
      state.user = action.payload;
      // return { ...state, users: payload };
    });

    builder.addCase(fetchAsyncUsers.rejected, (state, action) => {
      // console.log("Rejected!");
      state.status = "Failed";
      state.error = action.error.message;
    });
  },
});

export const { addUsers } = userSlice.actions;
export default userSlice.reducer;
