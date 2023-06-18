import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import db, { useAuth } from "../db/firebase";
import { useDispatch } from "react-redux";

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
      console.log("pending");
    });
    builder.addCase(fetchAsyncUsers.fulfilled, (state, action) => {
      state.status = "Successful";
      console.log("fetch successfully!");
      state.user = action.payload;
      // return { ...state, users: payload };
    });

    builder.addCase(fetchAsyncUsers.rejected, (state, action) => {
      console.log("Rejected!");
      state.status = "Failed";
      state.error = action.error.message;
    });

    // [fetchAsyncUsers.rejected]: (state, { payload }) => {
    //   console.log("fetch successfully!");
    //   return { ...state, users: payload };
    // },
    // [fetchAsyncUsers.rejected]: () => {
    //   console.log("Rejected!");
    // },
  },
});

export const { addUsers } = userSlice.actions;
export default userSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   user: [],
// };
// export const userSlice = createSlice({
//   name: "user",
//   initialState: initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { setUser } = userSlice.actions;

// export default userSlice.reducer;
