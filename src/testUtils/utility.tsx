import { configureStore, createStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import mediaReducer from "../store/slices/media";

export const renderWithRedux = (
  ui: any,
  options: {
    initialState: any;
  }
) => {
  const store = configureStore({
    preloadedState: options.initialState,
    reducer: { media: mediaReducer },
  });
  return { ...render(<Provider store={store}>{ui}</Provider>), store };
};
