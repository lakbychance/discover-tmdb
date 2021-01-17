import React from "react";
import clsx from "clsx";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MediaCategory } from "../../config/constants";
import { MediaCategoryButton, Search } from "../../components";
import { setCategory } from "../../store/slices/media";
const Header = () => {
  const media = useSelector((state: any) => state.media);
  const dispatch = useDispatch();
  const { category } = media;

  const updateMediaCategory = (category: string) => {
    dispatch(setCategory(category));
  };

  return (
    <header className={styles.header}>
      <span className={styles.title}>Discover</span>
      <nav>
        <MediaCategoryButton
          click={() => updateMediaCategory(MediaCategory.POPULAR)}
          isActive={category === MediaCategory.POPULAR}
          title={MediaCategory.POPULAR}
        />
        <MediaCategoryButton
          click={() => updateMediaCategory(MediaCategory.TRENDING)}
          title={MediaCategory.TRENDING}
          isActive={category === MediaCategory.TRENDING}
        />
        <MediaCategoryButton
          click={() => updateMediaCategory(MediaCategory.NEWEST)}
          title={MediaCategory.NEWEST}
          isActive={category === MediaCategory.NEWEST}
        />
        <MediaCategoryButton
          click={() => updateMediaCategory(MediaCategory.TOPRATED)}
          title={MediaCategory.TOPRATED}
          isActive={category === MediaCategory.TOPRATED}
        />
      </nav>
      <div className={styles.searchbarContainer}>
        <Search />
      </div>
    </header>
  );
};

export default Header;
