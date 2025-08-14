"use client";
import LoadingOverlay from "@/components/LoadingOverlay";

import styles from "./loading.module.css"

const loading = () => {
  return (
    <div className={styles.container}>
      <LoadingOverlay />;
    </div>
  );
};

export default loading;
