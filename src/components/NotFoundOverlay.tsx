"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePueblosContext } from "@/app/context/PueblosContext";

import styles from "./notFoundOverlay.module.css";

const NotFoundOverlay = ({
  title,
  showButton = true,
}: {
  title: string;
  showButton?: boolean;
}) => {
  const router = useRouter();
  const { airportId, setAirportId } = usePueblosContext();
  const handleClick = () => {
    if (airportId) {
      setAirportId([]);
    }
    router.back();
  };
  return (
    <div className={styles.container}>
      <Image
        className={styles.img}
        src="/axolotlPlaneNotFound.png"
        alt="axolotl flying a plane. LoadingOverlay screen"
        width={50}
        height={50}
        aria-hidden
      />
      <h3 className={styles.notFoundtext}>{title}</h3>
      {showButton && <button onClick={handleClick}>Go Back</button>}
    </div>
  );
};

export default NotFoundOverlay;
