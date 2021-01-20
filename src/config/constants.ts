import { QueryMap } from "./interface";

export enum MediaCategory {
  POPULAR = "POPULAR",
  TRENDING = "TRENDING",
  NEWEST = "NEWEST",
  TOPRATED = "TOP RATED",
  OTHER = "Other",
}

export const MovieSortQueryMap: QueryMap = {
  [MediaCategory.POPULAR]: "popularity.desc",
  [MediaCategory.NEWEST]: "release_date.desc",
  [MediaCategory.TOPRATED]: "vote_average.desc",
};

export const TVSortQueryMap: QueryMap = {
  [MediaCategory.POPULAR]: "popularity.desc",
  [MediaCategory.NEWEST]: "air_date.desc",
  [MediaCategory.TOPRATED]: "vote_average.desc",
};

export enum Status {
  IDLE = "IDLE",
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
}

export const DISCOVER_ENDPOINT = "https://api.themoviedb.org/3/discover";
export const TRENDING_ENDPOINT = "https://api.themoviedb.org/3/trending";
export const QUERY_ENDPOINT = "https://api.themoviedb.org/3/search/multi";
export const IMAGE_ENDPOINT = "https://image.tmdb.org/t/p/w300";
