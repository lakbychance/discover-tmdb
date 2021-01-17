import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, MediaCard } from "components";
import { MediaItem } from "config/interface";
import { AppRootState } from "store";
import { fetchMedia } from "store/slices/media";
import styles from "./MediaContainer.module.css";
import { IMAGE_ENDPOINT } from "config/constants";

const MediaContainer = () => {
  const media = useSelector((state: AppRootState) => state.media);
  const dispatch = useDispatch();
  const { category, filter } = media;
  const { mediaType } = filter;

  useEffect(() => {
    dispatch(fetchMedia());
  }, [category, filter, dispatch]);

  return (
    <>
      {media?.list?.length ? (
        <Layout>
          {media?.list?.map((mediaItem: MediaItem) => {
            const imagePath = mediaItem.poster_path
              ? `${IMAGE_ENDPOINT}${mediaItem.poster_path}`
              : "";
            return (
              <MediaCard
                src={imagePath}
                title={
                  mediaItem.original_title ??
                  mediaItem.original_name ??
                  mediaItem.name
                }
              />
            );
          })}
        </Layout>
      ) : (
        <section className={styles.noMediaAvailable}>
          <h1>
            No {mediaType === "tv" ? "tv show" : "movie"} is available for the
            selected filters
          </h1>
        </section>
      )}
    </>
  );
};

export default MediaContainer;
