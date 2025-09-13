import { Card, Title } from "@mantine/core";
import Image from "next/image";
import { Meteors } from "@/components/magicui/meteors";
import { TextAnimate } from "@/components/magicui/text-animate";

import styles from "./page.module.css";

const page = () => {
  return (
    <>
      <Meteors number={20} />
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
        <TextAnimate
          animation="blurInUp"
          by="character"
          duration={2.5}
          once
          style={{
            textAlign: "justify",
            marginTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          Whether it&apos;s found in cobblestone streets, the endless alleys,
          the homemade food and winding markets or the people hanging out in the
          town square. My hope is that this site will inspire you to plan that
          trip you&apos;ve been holding off on, pack your bags, and add the next
          chapter to your story...
        </TextAnimate>
      </Card>
    </>
  );
};

export default page;
