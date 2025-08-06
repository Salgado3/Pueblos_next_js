"use client";
import { usePueblosContext } from "../hooks/PueblosContext";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import Link from "next/link";

import styles from "./listClient.module.css";
import { Pueblo } from "../../../database.types";

const ListClient = () => {
  const { filteredPueblos, isLoading } = usePueblosContext();
  if (isLoading) return <div>Loading</div>;

  const puebloData = filteredPueblos?.map((item: Pueblo, i: number) => {
    if (!item?.title) return;
    return (
      <li className={styles.cardContainer} key={item.title + i}>
        <div className={styles.imageContainer}>
          <CloudinaryImage
            puebloTitle={item.title}
            publicId={item.cloudinary_id || ""}
            className={styles.cloudinaryImage}
          />
        </div>
        <div className={styles.titleContainer}>
          <Link
            href={`/${item.title.toLowerCase().replace(/\s+/g, "_")}`}
            rel="noopener noreferrer"
          >
            <h2 className={styles.titleHeader}>{item.title}</h2>
          </Link>
          <p className={styles.description}>{item.description}</p>
        </div>
      </li>
    );
  });

  return <ul>{puebloData}</ul>;
};

export default ListClient;
