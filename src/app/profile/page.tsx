"use client";
import NotFoundOverlay from "@/components/NotFoundOverlay";

import styles from "./page.module.css";

const page = () => {
  return (
    <div className={styles.container}>
      <NotFoundOverlay />
    </div>
  );
};

export default page;
