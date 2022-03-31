import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    resetUser(state) {
      state.user = null;
    },
  },
});

export const userSliceActions = userSlice.actions;
