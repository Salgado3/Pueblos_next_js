"use client";
import React from "react";
import { Text } from "@mantine/core";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import Link from "next/link";
import { usePueblosContext } from "../hooks/PueblosContext";

import styles from "./gridClient.module.css";

const GridClient = () => {
  const { filteredPueblos, isLoading } = usePueblosContext();
  console.log("Jaimes filtered Pueblos", filteredPueblos);
  const puebloData = filteredPueblos?.map((item, i) => {
    return (
      <li className={styles.cardContainer} key={item.title + i}>
        <h2 className={styles.titleHeader}>{item.title}</h2>
        <div className={styles.imageContainer}>
          <CloudinaryImage
            puebloTitle={item.title}
            className={styles.cloudinaryImg}
            publicId={item.cloudinary_id}
          />
          <p>
            photo by{" "}
            <Link
              href={item.photo_by_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.photo_by}
            </Link>
          </p>
        </div>
        <Text lineClamp={3} className={styles.description}>
          {item.description}
        </Text>
        <Link
          href={item.description_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <p>Learn More </p>
        </Link>
        <p>{`Airport ${item.airport_id}`}</p>
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
