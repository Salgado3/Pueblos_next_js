"use client";
import { Text } from "@mantine/core";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import Link from "next/link";
import { usePueblosContext } from "../hooks/PueblosContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import NotFoundOverlay from "@/components/NotFoundOverlay";

import styles from "./gridClient.module.css";

const GridClient = () => {
  const { filteredPueblos, isLoading } = usePueblosContext();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (filteredPueblos.length === 0)
    return <NotFoundOverlay title="Looks like nothing is here" />;

  const puebloData = filteredPueblos?.map((item, i) => {
    if (!item.title) return;
    return (
      <li className={styles.cardContainerList} key={item.title + i}>
        <Link
          //TODO set up dynamic links
          style={{ fontSize: "large" }}
          href={`/${item.title.toLowerCase().replace(/\s+/g, "_")}`}
          rel="noopener noreferrer"
        >
          <h2 className={styles.titleHeader}>{item.title}</h2>
          <div className={styles.imageContainer}>
            {item.title && item.cloudinary_id && (
              <CloudinaryImage
                puebloTitle={item.title}
                className={styles.cloudinaryImg}
                publicId={item.cloudinary_id}
              />
            )}
          </div>
        </Link>
        <div className={styles.textContainer}>
          <p>
            photo by{" "}
            <Link
              href={item.photo_by_url || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.photo_by}
            </Link>
          </p>
          <p>{`Closest Airport: ${item.airport_id}`}</p>

          <Text lineClamp={3} className={styles.description}>
            {item.description}
          </Text>
        </div>
      </li>
    );
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ul className={styles.unOrderedListContainer}>{puebloData}</ul>{" "}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default GridClient;
