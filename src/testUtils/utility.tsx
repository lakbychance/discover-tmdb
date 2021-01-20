import { configureStore, createStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { AppRootState } from "store";
import mediaReducer from "../store/slices/media";

export const renderWithRedux = (
  ui: React.ReactElement,
  options: {
    initialState: AppRootState;
  }
) => {
  const store = configureStore({
    preloadedState: options.initialState,
    reducer: { media: mediaReducer },
  });
  return { ...render(<Provider store={store}>{ui}</Provider>), store };
};
