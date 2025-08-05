"use client";
import { Button } from "@mantine/core";
import { IconMap2, IconLayoutGrid, IconListDetails } from "@tabler/icons-react";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";

import styles from "./changeViewMenu.module.css";

export const ChangeViewMenu = () => {
  const router = useRouter();
  const handleOnClick = ({
    event,
    path,
  }: {
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;
    path: string;
  }) => {
    event.preventDefault();
    console.log("jaime's e target", path);
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <Button
        justify="center"
        fullWidth
        variant="default"
        mt="md"
        className={styles.button}
        onClick={(e) => handleOnClick({ event: e, path: "/map" })}
        title="map"
      >
        <IconMap2 />
      </Button>
      <Button
        justify="center"
        fullWidth
        variant="default"
        mt="md"
        className={styles.button}
        onClick={(e) => handleOnClick({ event: e, path: "/grid" })}
        title="grid"
      >
        <IconLayoutGrid />
      </Button>
      <Button
        justify="center"
        fullWidth
        variant="default"
        mt="md"
        className={styles.button}
        onClick={(e) => handleOnClick({ event: e, path: "/list" })}
        title="list"
      >
        <IconListDetails />
      </Button>
    </div>
  );
};
