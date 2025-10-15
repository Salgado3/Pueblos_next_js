"use client";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import Link from "next/link";
import { usePueblosContext } from "../context/PueblosContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import NotFoundOverlay from "@/components/NotFoundOverlay";
import { BlurFade } from "@/components/magicui/blur-fade";

import styles from "./gridClient.module.css";

const MobileGridClient = () => {
  const { filteredPueblos, isLoading } = usePueblosContext();
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
      <BlurFade key={item.id} delay={0.25 + i * 0.05} inView>
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
      </BlurFade>
    );
  });

  return (
    <div className={styles.container}>
      <ul className={styles.unOrderedListContainer}>{puebloData}</ul>
    </div>
  );
};

export default MobileGridClient;
