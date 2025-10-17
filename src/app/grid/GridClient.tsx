"use client";
import { useMediaQuery } from "@mantine/hooks";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import { usePueblosContext } from "../context/PueblosContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import NotFoundOverlay from "@/components/NotFoundOverlay";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { BlurFade } from "@/components/magicui/blur-fade";
import MobileGridClient from "./MobileGridClient";
import BackToTopButton from "@/components/BackToTop";

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

  if (isMobile) {
    return <MobileGridClient />;
  }

  const puebloData = filteredPueblos?.map((item, i) => {
    if (!item.title) return;

    return (
      <BentoCard
        name={item.title}
        className="col-span-3 lg:col-span-1"
        //@ts-ignore
        description={
          <div className="flex flex-col">
            <span>{`Location: ${item.state}, ${item.country}`}</span>
            <span>{`Closest Airport: ${item.airport_id}`}</span>
          </div>
        }
        background={
          <BlurFade key={item.id} delay={0.25 + i * 0.05} inView>
            <div className="relative h-55 w-full">
              <CloudinaryImage
                puebloTitle={item.title}
                className={styles.cloudinaryImg}
                publicId={item.cloudinary_id || ""}
                borderRadius="1rem"
              />
            </div>
          </BlurFade>
        }
        Icon={"symbol"}
        href={`/${item.title.toLowerCase().replace(/\s+/g, "_")}`}
        cta={"Learn more"}
        key={i}
      />
    );
  });

  return (
    <div className={styles.container}>
      <BentoGrid>{puebloData}</BentoGrid>
      <BackToTopButton />
    </div>
  );
};

export default GridClient;
