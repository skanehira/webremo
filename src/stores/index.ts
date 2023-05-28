import { configureStore } from "@reduxjs/toolkit";
import loadReducer from "./loader";
import appReducer from "./apps";
import deviceReducer from "./devices";

export default configureStore({
  reducer: {
    load: loadReducer,
    app: appReducer,
    device: deviceReducer,
  },
});
