import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  movieCategoriesMap,
  movieGenres,
  trendingMovies,
} from "./data/movieData";
import { searchMedia } from "./data/searchData";

export const handlers = [
  rest.get("https://api.themoviedb.org/3/discover/movie", (req, res, ctx) => {
    let movieKey;
    movieKey = req.url.searchParams.get("sort_by");
    const withGenre = req.url.searchParams.get("with_genres");
    const fromReleaseDate = req.url.searchParams.get("release_date.gte");
    const rating = req.url.searchParams.get("vote_average.gte");
    if (withGenre) movieKey = withGenre;
    if (fromReleaseDate === "2000-01-01") movieKey = fromReleaseDate;
    if (rating === "8") movieKey = rating;
    return res(
      ctx.status(200),
      ctx.json({
        results: movieKey && movieCategoriesMap.get(movieKey),
      })
    );
  }),
  rest.get(
    "https://api.themoviedb.org/3/trending/movie/day",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          results: trendingMovies,
        })
      );
    }
  ),
  rest.get("https://api.themoviedb.org/3/genre/movie/list", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        genres: movieGenres,
      })
    );
  }),
  rest.get("https://api.themoviedb.org/3/search/multi", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: searchMedia,
      })
    );
  }),
];

export const server = setupServer(...handlers);
