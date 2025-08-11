"use client";
import { Button } from "@mantine/core";
import { IconMap2, IconLayoutGrid, IconListDetails } from "@tabler/icons-react";
import { MouseEvent, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { PueblosSearch } from "./PueblosSearch";

import styles from "./changeViewMenu.module.css";

export const ChangeViewMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDisabled, setIsDisabled] = useState("");
  const params = useParams<{ tag: string; item: string }>();
  const handleOnClick = ({
    event,
    path,
  }: {
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;
    path: string;
  }) => {
    event.preventDefault();
    setIsDisabled(path);
    router.push(path);
  };
  if (pathname === "/login") return;
  return (
    <div className={styles.container}>
      <Button
        justify="center"
        variant="default"
        mt="md"
        className={styles.button}
        onClick={(e) => handleOnClick({ event: e, path: "/map" })}
        title="map view"
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
        title="grid view"
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
        title="list view"
        disabled={isDisabled.includes("/list")}
      >
        <IconListDetails />
      </Button>
      {["/map", "/list", "/grid"].includes(pathname) && <PueblosSearch />}
    </div>
  );
};
