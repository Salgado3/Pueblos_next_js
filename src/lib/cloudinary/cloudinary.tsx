// components/CloudinaryImage.jsx
"use client"; // if you're using App Router (Next.js 13+)

import { Cloudinary } from "@cloudinary/url-gen";
import {
  AdvancedImage,
  lazyload,
  responsive,
  accessibility,
  placeholder,
} from "@cloudinary/react";

const CloudinaryImage = ({ publicId }: { publicId: string }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
    },
  });

  const cldImg = cld.image(publicId); // e.g. "sample" or "folder/image"

  return (
    <AdvancedImage
      cldImg={cldImg}
      style={{ maxWidth: "90%", maxHeight: "90%" }}
      plugins={[
        lazyload({ threshold: 0, rootMargin: "0px" }),
        responsive(),
        placeholder({ mode: "blur" }),
      ]}
    />
  );
};

export default CloudinaryImage;
