import { createSlice } from "@reduxjs/toolkit";
const initialState = null;
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      return action.payload;
    },
  },
});
export const authActions = authSlice.actions;
