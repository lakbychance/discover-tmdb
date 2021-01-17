import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import Select, { ValueType } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../store/slices/media";
import styles from "./FilterOptions.module.css";
import { MediaCategory } from "../../config/constants";

const mediaTypesList = [
  {
    label: "Movie",
    value: "movie",
  },
  {
    label: "TV",
    value: "tv",
  },
];
const getYearList = (from: number, to: number) => {
  const yearList = [];
  for (let i = from; i <= to; i++) {
    yearList.push({ label: `${i}`, value: `${i}` });
  }
  return yearList;
};
const yearList = getYearList(1900, new Date().getFullYear());
const dropdownStyle = {
  control: (base: any) => ({
    ...base,
    background: "transparent",
    border: "1px solid grey",
  }),
  indicatorSeparator: (provided: any) => ({ ...provided, display: "none" }),
  dropdownIndicator: (provided: any) => ({ ...provided, width: "30px" }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "white",
    width: "80%",
  }),
};
const FilterOptions = () => {
  const media = useSelector((state: any) => state.media);
  const [genreList, setGenreList] = useState<any>([]);
  const dispatch = useDispatch();
  const { category, filter } = media;
  const { genre, mediaType, rating } = filter;

  const handleOptionValue = useCallback(
    (
      filterType: string,
      option: ValueType<{ label: string; value: string }, false>
    ) => {
      let updatedFilterOption = null;
      if (filterType === "mediaType") {
        updatedFilterOption = {
          [filterType]: option?.value,
          genre: { label: "All", value: "All" },
        };
      } else if (filterType === "genre") {
        updatedFilterOption = { [filterType]: option };
      } else {
        updatedFilterOption = { [filterType]: option?.value };
      }
      dispatch(setFilter(updatedFilterOption));
    },
    [dispatch]
  );

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(({ data }) => {
        const genres = data.genres.map((genre: any) => ({
          label: genre.name,
          value: genre.id,
        }));
        genres.unshift({ label: "All", value: "All" });
        setGenreList(genres);
      });
  }, [mediaType]);

  return (
    <div className={styles.filterMenu}>
      <span className={styles.title}>DISCOVER OPTIONS</span>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdown}>
          <span>Type</span>
          <Select
            aria-label="mediaTypeDropdown"
            styles={dropdownStyle}
            options={mediaTypesList}
            defaultValue={mediaTypesList[0]}
            onChange={(option) => handleOptionValue("mediaType", option)}
          ></Select>
        </div>
        {genreList.length && (
          <div className={styles.dropdown}>
            <span>Genre</span>
            <Select
              aria-label="genreDropdown"
              styles={dropdownStyle}
              options={genreList}
              defaultValue={genre}
              value={genre}
              onChange={(option) => handleOptionValue("genre", option)}
              isDisabled={category === MediaCategory.TRENDING}
            ></Select>
          </div>
        )}
        <div className={styles.yearRange}>
          <span>Year</span>
          <div className={styles.yearRangeContainer}>
            <div className={styles.dropdown}>
              <Select
                aria-label="fromYear"
                styles={dropdownStyle}
                options={yearList}
                defaultValue={yearList[0]}
                onChange={(option) => handleOptionValue("fromYear", option)}
                isDisabled={category === MediaCategory.TRENDING}
              ></Select>
            </div>
            <span className={styles.yearRangeDash}>-</span>
            <div className={styles.dropdown}>
              <Select
                aria-label="fromYear"
                styles={dropdownStyle}
                options={yearList}
                defaultValue={yearList[yearList.length - 1]}
                onChange={(option) => handleOptionValue("toYear", option)}
                isDisabled={category === MediaCategory.TRENDING}
              ></Select>
            </div>
          </div>
        </div>
      </div>
      <span>Rating</span>
      <Rating
        name="simple-controlled"
        value={rating / 2}
        onChange={(event, newValue) => {
          const rating = newValue && newValue * 2;
          dispatch(setFilter({ rating }));
        }}
        disabled={category === MediaCategory.TRENDING}
      />
    </div>
  );
};

export default FilterOptions;
