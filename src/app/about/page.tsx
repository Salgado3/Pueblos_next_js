import { Card, Title } from "@mantine/core";
import Image from "next/image";

import styles from "./page.module.css";

const page = () => {
  return (
    <Card className={styles.cardContainer}>
      <div className={styles.cardTitleContainer}>
        <Image
          src="/axolotlSuitcase.png"
          alt="axolotlSuitcase"
          aria-hidden
          className={styles.logoImg}
        />
        <Title order={1} ta="center" className={styles.title}>
          About This Project
        </Title>
        <Image
          src="/axolotlSuitcase.png"
          alt="axolotlSuitcase"
          aria-hidden
          className={styles.logoImg}
        />
      </div>
      <p className={styles.text}>WELCOME. Work in progress.</p>
    </Card>
  );
};

export default page;
