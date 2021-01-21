import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {
  DISCOVER_ENDPOINT,
  MediaCategory,
  MovieSortQueryMap,
  QUERY_ENDPOINT,
  Status,
  TRENDING_ENDPOINT,
  TVSortQueryMap,
} from "config/constants";
import { GenreForState, MediaItem } from "config/interface";

interface FilterState {
  genre: GenreForState;
  mediaType: string;
  fromYear: string;
  toYear: string;
  rating: string;
}

interface MediaState {
  category: MediaCategory;
  filter: FilterState;
  list: MediaItem[];
  status: Status;
}

export const mediaSlice = createSlice({
  name: "media",
  initialState: {
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
  reducers: {
    setCategory: (state: MediaState, action) => {
      const category = action.payload;
      state.category = category;
    },
    setFilter: (state: MediaState, action) => {
      const updatedFilterOption = action.payload;
      state.filter = { ...state.filter, ...updatedFilterOption };
    },
    setList: (state: MediaState, action) => {
      const list = action.payload;
      state.list = list;
    },
    setStatus: (state: MediaState, action) => {
      const status = action.payload;
      state.status = status;
    },
  },
});

const urlBuilder = (media: MediaState) => {
  const { fromYear, genre, rating, toYear, mediaType } = media.filter;
  const { category } = media;
  let url = "";
  if (category !== MediaCategory.TRENDING) {
    const fromDate = `${fromYear}-01-01`;
    const toDate = `${toYear}-01-01`;
    const sortBy =
      mediaType === "movie"
        ? MovieSortQueryMap[category]
        : TVSortQueryMap[category];
    url = `${DISCOVER_ENDPOINT}/${mediaType}?api_key=${process.env.REACT_APP_API_KEY}&sort_by=${sortBy}&vote_average.gte=${rating}&include_adult=false`;
    if (genre.value !== "All") {
      url = url.concat(`&with_genres=${genre.value}`);
    }
    url =
      mediaType === "movie"
        ? url.concat(`&release_date.gte=${fromDate}&release_date.lte=${toDate}`)
        : url.concat(`&air_date.gte=${fromDate}&air_date.lte=${toDate}`);
  } else {
    url = `${TRENDING_ENDPOINT}/${mediaType}/day?api_key=${process.env.REACT_APP_API_KEY}`;
  }
  return url;
};

export const fetchMedia = () => (
  dispatch: Dispatch,
  getState: () => { media: MediaState }
) => {
  const { media } = getState();
  const mediaUrl = urlBuilder(media);
  dispatch(setStatus(Status.PENDING));
  axios.get(mediaUrl).then(({ data }) => {
    dispatch(setStatus(Status.RESOLVED));
    dispatch(setList(data.results));
  });
};

export const fetchMediaByQuery = (query: string) => (dispatch: Dispatch) => {
  const queryUrl = `${QUERY_ENDPOINT}/?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`;
  dispatch(setCategory(MediaCategory.OTHER));
  dispatch(setStatus(Status.PENDING));
  axios.get(queryUrl).then(({ data }) => {
    dispatch(setStatus(Status.RESOLVED));
    dispatch(setList(data.results));
  });
};

export const {
  setCategory,
  setFilter,
  setList,
  setStatus,
} = mediaSlice.actions;
export default mediaSlice.reducer;
