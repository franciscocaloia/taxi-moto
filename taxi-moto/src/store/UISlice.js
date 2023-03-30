import { createSlice } from "@reduxjs/toolkit";
const initialState = { showMenu: false };
export const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    hideMenu(state) {
      state.showMenu = false;
    },
    toggleShowMenu(state) {
      state.showMenu = !state.showMenu;
    },
  },
});

export const UIActions = UISlice.actions;
