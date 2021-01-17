import clsx from "clsx";
import React from "react";
import styles from "./MediaCategoryButton.module.css";
interface ComponentProps {
  click: () => void;
  isActive: boolean;
  title: string;
}

const MediaCategoryButton: React.FC<ComponentProps> = ({
  click,
  isActive,
  title,
}) => {
  return (
    <button
      className={clsx(styles.mediaCategory, isActive && styles.activeCategory)}
      onClick={click}
    >
      {title}
    </button>
  );
};

export default MediaCategoryButton;
