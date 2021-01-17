import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, MediaCard } from "../../components";
import { fetchMedia } from "../../store/slices/media";
import styles from "./MediaContainer.module.css";

const MediaContainer = () => {
  const media = useSelector((state: any) => state.media);
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
          {media?.list?.map((mediaItem: any) => {
            return (
              <MediaCard
                src={mediaItem.poster_path}
                title={mediaItem.original_title ?? mediaItem.original_name}
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
