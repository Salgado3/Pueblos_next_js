"use client";
import Image from "next/image";

import styles from "./loadingOverlay.module.css";

const LoadingOverlay = () => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.img}
        src="/axolotlPlane2.png"
        alt="axolotl flying a plane. LoadingOverlay screen"
        width={50}
        height={50}
        aria-hidden
      />
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default LoadingOverlay;
