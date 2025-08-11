import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePueblosContext } from "@/app/hooks/PueblosContext";

import styles from "./notFoundOverlay.module.css";

const NotFoundOverlay = () => {
  const router = useRouter();
  const { setAirportId } = usePueblosContext();
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
      <p className={styles.notFoundtext}>Looks like nothing is here</p>
      <button onClick={() => setAirportId("")}>Go Back</button>
    </div>
  );
};

export default NotFoundOverlay;
