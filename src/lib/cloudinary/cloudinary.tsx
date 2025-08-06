// components/CloudinaryImage.jsx
"use client"; // if you're using App Router (Next.js 13+)
import { useState } from "react";
import Image from "next/image";
import { Cloudinary } from "@cloudinary/url-gen";
import {
  AdvancedImage,
  lazyload,
  responsive,
  accessibility,
  placeholder,
} from "@cloudinary/react";

const CloudinaryImage = ({
  puebloTitle,
  publicId,
  className,
}: {
  puebloTitle: string;
  publicId: string;
  className?: string;
}) => {
  const [hasError, setHasError] = useState(false);
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
    },
  });

  const cldImg = cld.image(publicId); // e.g. "sample" or "folder/image"

  if (hasError) {
    return (
      <Image
        src="/imageNotFound.png" // Replace with your fallback image path
        alt="image not available"
        style={{ maxWidth: "90%", maxHeight: "90%" }}
      />
    );
  }
  return (
    <AdvancedImage
      cldImg={cldImg}
      className={className || ""}
      style={{ maxWidth: "100%", maxHeight: "100%" }}
      alt={puebloTitle}
      plugins={[
        lazyload({ threshold: 0, rootMargin: "0px" }),
        responsive(),
        placeholder({ mode: "blur" }),
      ]}
      onError={() => setHasError(true)}
    />
  );
};

export default CloudinaryImage;
