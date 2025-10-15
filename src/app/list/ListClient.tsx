"use client";
import { usePueblosContext } from "../context/PueblosContext";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import Link from "next/link";
import { Text } from "@mantine/core";
import NotFoundOverlay from "@/components/NotFoundOverlay";
import { useMediaQuery } from "@mantine/hooks";
import LoadingOverlay from "@/components/LoadingOverlay";
import { BlurFade } from "@/components/magicui/blur-fade";
import BackToTopButton from "@/components/BackToTop";

import styles from "./listClient.module.css";

const ListClient = () => {
  const { filteredPueblos, isLoading } = usePueblosContext();
  const isMobile = useMediaQuery("(max-width: 600px)", true);

  if (isLoading) return <LoadingOverlay />;
  if (filteredPueblos.length === 0)
    return (
      <NotFoundOverlay title="Looks like nothing is here" showButton={false} />
    );

  const puebloData = filteredPueblos?.map((item, i) => {
    if (!item?.title) return;
    return (
      <BlurFade key={item.id} delay={0.05 + i * 0.05} inView>
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
                width={isMobile ? 75 : 100}
                height={isMobile ? 75 : 100}
              />
            </div>
            <div className={styles.titleContainer}>
              <h2 className={styles.titleHeader}>{item.title}</h2>
              <span
                className={styles.stateText}
              >{`Location: ${item.state}, ${item.country}`}</span>
              <span
                className={styles.airportText}
              >{`Nearest Airport: ${item.airport_id}`}</span>
              {!isMobile && (
                <>
                  <Text lineClamp={1} className={styles.description}>
                    {item.description}
                  </Text>
                </>
              )}
            </div>
          </Link>
        </li>
      </BlurFade>
    );
  });

  return (
    <div className={styles.container}>
      <ul>{puebloData}</ul>
      <BackToTopButton />
    </div>
  );
};

export default ListClient;
