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
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
