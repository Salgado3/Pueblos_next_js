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
          width={50}
          height={50}
          aria-hidden
          className={styles.logoImg}
        />
        <Title order={1} ta="center" className={styles.title}>
          About This Project
        </Title>
        <Image
          src="/axolotlSuitcase.png"
          alt="axolotlSuitcase"
          width={50}
          height={50}
          aria-hidden
          className={styles.logoImg}
        />
      </div>
      <p className={styles.text}>Every pluebo has a story. </p>
      <p>
        It can be the cobble streets linking the the town square, the endless
        alleys, the homemade food and winding markets. Regardless of where you
        are, you get to meet new people, learn their story and appreciate the
        place they call home...
      </p>
    </Card>
  );
};

export default page;
