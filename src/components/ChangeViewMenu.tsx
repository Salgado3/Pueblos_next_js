"use client";
import { Button } from "@mantine/core";
import { IconMap2, IconLayoutGrid, IconListDetails } from "@tabler/icons-react";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PueblosSearch } from "./PueblosSearch";

import styles from "./changeViewMenu.module.css";

export const ChangeViewMenu = () => {
  const router = useRouter();
  const [isDisabled, setIsDesabled] = useState("");

  const handleOnClick = ({
    event,
    path,
  }: {
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;
    path: string;
  }) => {
    event.preventDefault();
    console.log("jaime's e target", path);
    setIsDesabled(path);
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <Button
        justify="center"
        variant="default"
        mt="md"
        className={styles.button}
        onClick={(e) => handleOnClick({ event: e, path: "/map" })}
        title="map"
        disabled={isDisabled.includes("/map")}
      >
        <IconMap2 />
      </Button>
      <Button
        justify="center"
        variant="default"
        mt="md"
        className={styles.button}
        onClick={(e) => handleOnClick({ event: e, path: "/grid" })}
        title="grid"
        disabled={isDisabled.includes("/grid")}
      >
        <IconLayoutGrid />
      </Button>
      <Button
        justify="center"
        variant="default"
        mt="md"
        className={styles.button}
        onClick={(e) => handleOnClick({ event: e, path: "/list" })}
        title="list"
        disabled={isDisabled.includes("/list")}
      >
        <IconListDetails />
      </Button>
      <PueblosSearch />
    </div>
  );
};
