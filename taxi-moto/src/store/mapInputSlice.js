import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  route: {
    from: undefined,
    to: undefined,
    totalDistance: 0,
  },
  mapCoords: undefined,
};

export const mapInputSlice = createSlice({
  name: "mapInput",
  initialState,
  reducers: {
    setRoute(state, action) {
      state.route = action.payload;
    },
    setMapCoords(state, action) {
      state.mapCoords = action.payload;
    },
  },
});

export const mapInputActions = mapInputSlice.actions;
