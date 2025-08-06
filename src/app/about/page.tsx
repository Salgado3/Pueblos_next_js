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
      <p className={styles.text}>
        Mexico has a rich and colorful history with various climates and
        terrains. The Pueblos Magicos are Magical towns located all over Mexico.
        However, many people are unaware that these towns exist. For that
        reason, I've created a web app that will show you the true beauty of
        Mexico and hopefully encourage you to visit one (or many) of these
        Pueblos! I hope you enjoy and happy exploring!
      </p>
    </Card>
  );
};

export default page;
