import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { mapInputSlice } from "./mapInputSlice";
import { UISlice } from "./UISlice";
const store = configureStore({
  reducer: {
    UI: UISlice.reducer,
    auth: authSlice.reducer,
    mapInput: mapInputSlice.reducer,
  },
});

export default store;
