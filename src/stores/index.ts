import { configureStore } from "@reduxjs/toolkit";
import loadReducer from "./loader";

export default configureStore({
  reducer: {
    load: loadReducer,
  },
});
