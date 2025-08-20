"use client";

import NotFoundOverlay from "@/components/NotFoundOverlay";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <NotFoundOverlay title="Looks like nothing is here" showButton={true} />
    </div>
  );
}
