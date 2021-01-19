import React from "react";
import {
  fireEvent,
  getAllByPlaceholderText,
  waitFor,
} from "@testing-library/react";
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
    const category = await waitFor(() => getByText(MediaCategory.TRENDING));
    fireEvent.click(category);
    expect(category.className).toContain("activeCategory");
    const movie = await waitFor(() => getByText("Outside the Wire"));
    expect(movie).toBeInTheDocument();
  });
  test("With Newest category selected", async () => {
    const { getByText } = renderWithRedux(<App />, { initialState });
    const category = await waitFor(() => getByText(MediaCategory.NEWEST));
    fireEvent.click(category);
    expect(category.className).toContain("activeCategory");
    const movie = await waitFor(() => getByText("Purple Matter"));
    expect(movie).toBeInTheDocument();
  });
  test("With Newest category selected", async () => {
    const { getByText } = renderWithRedux(<App />, { initialState });
    const category = await waitFor(() => getByText(MediaCategory.NEWEST));
    fireEvent.click(category);
    expect(category.className).toContain("activeCategory");
    const movie = await waitFor(() => getByText("Purple Matter"));
    expect(movie).toBeInTheDocument();
  });
  test("With Top Rated category selected", async () => {
    const { getByText } = renderWithRedux(<App />, { initialState });
    const category = await waitFor(() => getByText(MediaCategory.TOPRATED));
    fireEvent.click(category);
    expect(category.className).toContain("activeCategory");
    const movie = await waitFor(() => getByText("Sachertorte"));
    expect(movie).toBeInTheDocument();
  });
  test("With Animation genre selected", async () => {
    const { getByText } = renderWithRedux(<App />, { initialState });
    const selectedGenre = await waitFor(() => getByText("All"));
    fireEvent.focus(selectedGenre);
    fireEvent.keyDown(selectedGenre, { key: "ArrowDown" });
    const genreToUpdate = await waitFor(() => getByText("Animation"));
    fireEvent.click(genreToUpdate);
    const movie = await waitFor(() => getByText("Soul"));
    expect(movie).toBeInTheDocument();
  });
  test("With From Year selected", async () => {
    const { getByText } = renderWithRedux(<App />, { initialState });
    const selectedFromYear = await waitFor(() => getByText("1900"));
    fireEvent.focus(selectedFromYear);
    fireEvent.keyDown(selectedFromYear, { key: "ArrowDown" });
    const fromYearToUpdate = await waitFor(() => getByText("2000"));
    fireEvent.click(fromYearToUpdate);
    const movie = await waitFor(() => getByText("The Homesman"));
    expect(movie).toBeInTheDocument();
  });
  test("With Rating selected", async () => {
    const { getByText } = renderWithRedux(<App />, { initialState });
    const rating = await waitFor(() => getByText("4 Stars"));
    if (rating.parentElement) fireEvent.click(rating.parentElement);
    const movie = await waitFor(() =>
      getByText("Miraculous World: New York, United HeroeZ")
    );
    expect(movie).toBeInTheDocument();
  });
});

test("renders Discover App with search query results  ", async () => {
  const { getByPlaceholderText, getByText } = renderWithRedux(<App />, {
    initialState,
  });
  const search = await waitFor(() => getByPlaceholderText("Search..."));
  fireEvent.change(search, { target: { value: "Dragon Ball Z" } });
  fireEvent.keyDown(search, { key: "Enter" });
  const movie = await waitFor(() => getByText("Dragon Ball Z: The Real 4-D"));
  expect(movie).toBeInTheDocument();
});
