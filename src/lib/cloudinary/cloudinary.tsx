"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import cloudinaryLoader from "./cloudinaryLoader";

const CloudinaryImage = ({
  puebloTitle,
  publicId,
  className,
  width = 300,
  height = 300,
}: {
  puebloTitle: string;
  publicId: string;
  className?: string;
  width?: number;
  height?: number;
}) => {
  const [hasError, setHasError] = useState(false);

  // Generate a super low-res placeholder based on aspect ratio
  const blurDataURL = useMemo(() => {
    const aspectRatio = width / height;
    const blurWidth = 10; // tiny width for placeholder
    const blurHeight = Math.round(blurWidth / aspectRatio);

    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/w_${blurWidth},h_${blurHeight},c_fill,q_10/${publicId}`;
  }, [width, height, publicId]);

  if (hasError) {
    return (
      <Image
        className={className || ""}
        src="/imageNotFound.png" // Replace with your fallback image path
        alt="image not available"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        width={width}
        height={height}
      />
    );
  }
  return (
    <Image
      className={className || ""}
      loader={cloudinaryLoader}
      src={publicId} // e.g. "folder/image.jpg"
      alt={puebloTitle}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={blurDataURL}
      onError={() => setHasError(true)}
      loading="lazy"
      style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "1rem" }}
    />
  );
};

export default CloudinaryImage;
