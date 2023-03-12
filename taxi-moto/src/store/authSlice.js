import { createSlice } from "@reduxjs/toolkit";
const initialState = null;
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      console.log(action.payload);
      return action.payload;
    },
  },
});
export const authActions = authSlice.actions;
