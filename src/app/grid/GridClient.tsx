"use client";
import { Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import Link from "next/link";
import { usePueblosContext } from "../context/PueblosContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import NotFoundOverlay from "@/components/NotFoundOverlay";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { BlurFade } from "@/components/magicui/blur-fade";
import MobileGridClient from "./MobileGridClient";

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
    const spanPattern = [
      "col-span-3 lg:col-span-2", // true (wide)
      "col-span-4 lg:col-span-1", // false (narrow)
      "col-span-4 lg:col-span-1", // false
      "col-span-3 lg:col-span-2", // true
      "col-span-3 lg:col-span-2", // true
      "col-span-2 lg:col-span-1", // false
      "col-span-2 lg:col-span-1", // false
      "col-span-3 lg:col-span-2", // true
    ];
    const className = spanPattern[i % spanPattern.length];
    return (
      <BentoCard
        name={item.title}
        className={className}
        //@ts-ignore
        description={
          <div>
            <span>{`Location: ${item.state}, ${item.country}`}</span>
            <span>{`Closest Airport: ${item.airport_id}`}</span>
          </div>
        }
        background={
          <BlurFade key={item.id} delay={0.25 + i * 0.05} inView>
            <div className="relative h-60 w-full">
              <CloudinaryImage
                puebloTitle={item.title}
                className={styles.cloudinaryImg}
                publicId={item.cloudinary_id || ""}
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
    <BentoGrid className="columns-2 sm:columns-3 lg:columns-4 gap-4">
      {puebloData}
    </BentoGrid>
  );
};

export default GridClient;
