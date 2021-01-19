import { rest } from "msw";
import { setupServer } from "msw/node";
import { GenreFromResponse, MediaItem } from "config/interface";
import { movieGenres, popularMovies, trendingMovies } from "./data";

const apiKey = process.env.REACT_APP_API_KEY;

export const handlers = [
  rest.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort
  _by=popularity.desc&vote_average.gte=5&include_adult=false`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          results: popularMovies,
        })
      );
    }
  ),
  rest.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          results: trendingMovies,
        })
      );
    }
  ),
  rest.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          genres: movieGenres,
        })
      );
    }
  ),
];

export const server = setupServer(...handlers);
