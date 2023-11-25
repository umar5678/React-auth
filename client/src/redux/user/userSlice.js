import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currUser: null,
  loading: false,
  err: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.currUser = action.payload;
      state.loading = false;
      state.err = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currUser = action.payload;
      state.loading = false;
      state.err = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currUser = null;
      state.loading = false;
      state.err = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
    signOut: (state) => {
      state.currUser = null;
      state.loading = false;
      state.err = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} = userSlice.actions;

export default userSlice.reducer;
