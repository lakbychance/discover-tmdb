export enum MediaCategory {
  POPULAR = "POPULAR",
  TRENDING = "TRENDING",
  NEWEST = "NEWEST",
  TOPRATED = "TOP RATED",
}

export const MovieSortQueryMap = {
  [MediaCategory.POPULAR]: "popularity.desc",
  [MediaCategory.NEWEST]: "release_date.desc",
  [MediaCategory.TOPRATED]: "vote_average.desc",
} as any;

export const TVSortQueryMap = {
  [MediaCategory.POPULAR]: "popularity.desc",
  [MediaCategory.NEWEST]: "air_date.desc",
  [MediaCategory.TOPRATED]: "vote_average.desc",
} as any;

export const DISCOVER_ENDPOINT = "https://api.themoviedb.org/3/discover";
export const TRENDING_ENDPOINT = "https://api.themoviedb.org/3/trending";
