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

// Initialize the state with the user from sessionStorage (if available)
const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser")) || null, // Persist user from sessionStorage
  users: [],
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, { payload }) => {
      state.users = payload;
    },
    setCurrentUser: (state, { payload }) => {
      state.user = payload; // Update the current user
      sessionStorage.setItem("currentUser", JSON.stringify(payload)); // Save to sessionStorage
    },
    clearCurrentUser: (state) => {
      state.user = null;
      sessionStorage.removeItem("currentUser"); // Remove user from sessionStorage
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncUsers.pending, (state) => {
      state.status = "Loading.....";
    });
    builder.addCase(fetchAsyncUsers.fulfilled, (state, action) => {
      state.status = "Successful";
      state.users = action.payload;
    });
    builder.addCase(fetchAsyncUsers.rejected, (state, action) => {
      state.status = "Failed";
      state.error = action.error.message;
    });
  },
});

export const { addUsers, setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
