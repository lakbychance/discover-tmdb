import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "./slices/media";

export default configureStore({
  reducer: {
    media: mediaReducer,
  },
});
