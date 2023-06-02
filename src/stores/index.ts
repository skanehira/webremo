import { configureStore } from "@reduxjs/toolkit";
import progressReducer from "./progress";
import appReducer from "./apps";
import deviceReducer from "./devices";

export default configureStore({
  reducer: {
    progress: progressReducer,
    app: appReducer,
    device: deviceReducer,
  },
});
