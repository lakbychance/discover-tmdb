import React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { renderWithRedux } from "testUtils/utility";
import { MediaCategory, Status } from "config/constants";
import { AppRootState } from "store";

const initialState: AppRootState = {
  media: {
    category: MediaCategory.POPULAR,
    filter: {
      genre: { label: "All", value: "All" },
      mediaType: "movie",
      fromYear: "1900",
      toYear: "2021",
      rating: "5",
    },
    list: [],
    status: Status.IDLE,
  },
};

describe("renders Discover App for movies ", () => {
  test("With Popular category selected", async () => {
    const { getByText } = renderWithRedux(<App />, { initialState });
    const { className } = await waitFor(() => getByText(MediaCategory.POPULAR));
    expect(className).toContain("activeCategory");
    const movie = await waitFor(() => getByText("Wonder Woman 1984"));
    expect(movie).toBeInTheDocument();
  });
  test("With Trending category selected", async () => {
    const { getByText } = renderWithRedux(<App />, { initialState });
    const trendingElement = await waitFor(() =>
      getByText(MediaCategory.TRENDING)
    );
    fireEvent.click(trendingElement);
    const { className } = await waitFor(() =>
      getByText(MediaCategory.TRENDING)
    );
    expect(className).toContain("activeCategory");
    const movie = await waitFor(() => getByText("Outside the Wire"));
    expect(movie).toBeInTheDocument();
  });
});
