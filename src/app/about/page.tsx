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
          width={40}
          height={40}
          aria-hidden
          className={styles.logoImg}
        />
        <Title order={1} ta="center" className={styles.title}>
          About This Project
        </Title>
        <Image
          src="/axolotlSuitcase.png"
          alt="axolotlSuitcase"
          width={40}
          height={40}
          aria-hidden
          className={styles.logoImg}
        />
      </div>
      <p className={styles.text}>Every place tells a story.</p>
      <p style={{ textAlign: "justify" }}>
        Whether it&apos;s found in cobblestone streets, the endless alleys, the
        homemade food and winding markets or the people hanging out in the town
        square. My hope is that this site will inspire you to plan that trip
        you&apos;ve been holding off on, pack your bags, and add the next
        chapter to your story...
      </p>
    </Card>
  );
};

export default page;
