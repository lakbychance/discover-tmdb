import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "./slices/media";

const store = configureStore({
  reducer: {
    media: mediaReducer,
  },
});

export type AppRootState = ReturnType<typeof store.getState>;
export default store;
