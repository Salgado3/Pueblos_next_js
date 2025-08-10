"use client";
import { usePueblosContext } from "../hooks/PueblosContext";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import Link from "next/link";

import styles from "./listClient.module.css";
import { Pueblo } from "../../../database.types";
import NotFoundOverlay from "@/components/NotFoundOverlay";
import { useMediaQuery } from "@mantine/hooks";
import LoadingOverlay from "@/components/LoadingOverlay";

const ListClient = () => {
  const { filteredPueblos, isLoading } = usePueblosContext();
  const isMobile = useMediaQuery("(max-width: 500px)");

  if (isLoading) return <LoadingOverlay />;
  if (filteredPueblos.length === 0) return <NotFoundOverlay />;

  const puebloData = filteredPueblos?.map((item: Pueblo, i: number) => {
    if (!item?.title) return;
    return (
      <li className={styles.cardContainer} key={item.title + i}>
        <Link
          className={styles.cardContainerLink}
          href={`/${item.title.toLowerCase().replace(/\s+/g, "_")}`}
          rel="noopener noreferrer"
        >
          <div className={styles.imageContainer}>
            <CloudinaryImage
              puebloTitle={item.title}
              publicId={item.cloudinary_id || ""}
              className={styles.cloudinaryImage}
            />
          </div>
          <div className={styles.titleContainer}>
            <h2 className={styles.titleHeader}>{item.title}</h2>

            {!isMobile && (
              <p className={styles.description}>{item.description}</p>
            )}
            {isMobile && (
              <p
                className={styles.description}
              >{`Nearest Airport: ${item.airport_id}`}</p>
            )}
          </div>
        </Link>
      </li>
    );
  });

  return <ul>{puebloData}</ul>;
};

export default ListClient;
