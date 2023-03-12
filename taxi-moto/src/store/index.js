import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { mapInputSlice } from "./mapInputSlice";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    mapInput: mapInputSlice.reducer,
  },
});

export default store;
