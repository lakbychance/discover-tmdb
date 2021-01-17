import React from "react";
import styles from "./MediaCard.module.css";

interface ComponentProps {
  src: string;
  title: string;
}

const MediaCard: React.FC<ComponentProps> = ({ src, title }) => {
  return (
    <div className={styles.mediaCard}>
      {src ? (
        <img
          className={styles.mediaImage}
          src={`https://image.tmdb.org/t/p/w300${src}`}
          alt={title}
        />
      ) : (
        <div className={styles.noImageAvailable}>
          <span>No Image Available</span>
        </div>
      )}
      <span className={styles.title}>{title}</span>
    </div>
  );
};

export default MediaCard;
