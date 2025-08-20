"use client";
import { Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import Link from "next/link";
import { usePueblosContext } from "../context/PueblosContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import NotFoundOverlay from "@/components/NotFoundOverlay";

import styles from "./gridClient.module.css";

const GridClient = () => {
  const { filteredPueblos, isLoading } = usePueblosContext();
  const isMobile = useMediaQuery("(max-width: 600px)", true);
  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (filteredPueblos.length === 0)
    return (
      <NotFoundOverlay title="Looks like nothing is here" showButton={false} />
    );

  const puebloData = filteredPueblos?.map((item, i) => {
    if (!item.title) return;
    return (
      <li className={styles.cardContainerList} key={item.title + i}>
        <Link
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
          <span
            className={styles.locationText}
          >{`Location: ${item.state}, ${item.country}`}</span>
          <span
            className={styles.locationText}
          >{`Closest Airport: ${item.airport_id}`}</span>
        </div>
      </li>
    );
  });

  return (
    <div className={styles.container}>
      <ul className={styles.unOrderedListContainer}>{puebloData}</ul>
    </div>
  );
};

export default GridClient;
