import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, TextField } from "@material-ui/core";
import styles from "./Search.module.css";
import { fetchMediaByQuery } from "../../store/slices/media";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  input: {
    background: "var(--color-secondary-bg)",
    boxShadow: "0px 0px 8px 0px var(--color-primary-shadow)",
    color: "var(--color-secondary-text)",
    fontWeight: "bold",
    paddingLeft: "5px",
  },
});

const Search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleEnter = (event: any) => {
    const isEnter = event.key === "Enter";
    if (isEnter) {
      searchQuery();
    }
  };

  const handleQuery = (event: any) => {
    setQuery(event.target.value);
  };

  const searchQuery = () => {
    dispatch(fetchMediaByQuery(query));
  };

  return (
    <div className={styles.searchbar}>
      <SearchIcon className={styles.searchIcon} onClick={searchQuery} />
      <TextField
        className={styles.searchField}
        value={query}
        onChange={handleQuery}
        onKeyDown={handleEnter}
        InputProps={{
          className: classes.input,
        }}
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
