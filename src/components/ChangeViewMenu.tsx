"use client";
import { Button } from "@mantine/core";
import { IconMap2, IconLayoutGrid, IconListDetails } from "@tabler/icons-react";
import { MouseEvent, useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { PueblosSearch } from "./PueblosSearch";
import BackLink from "./BackLink";

import styles from "./changeViewMenu.module.css";

export const ChangeViewMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDisabled, setIsDisabled] = useState("");
  const mainView = ["/map", "/list", "/grid"].includes(pathname);
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
//TODO verify
  useEffect(() => {
    if (!mainView) {
      setIsDisabled(pathname);
    }
  }, [mainView, pathname]);

  if (pathname === "/login" || pathname === "/signup") return;
  return (
    <div className={mainView ? styles.container : styles.auxViewContainer}>
      <BackLink />
      <Button
        justify="center"
        variant="default"
        mt="md"
        className={styles.button}
        onClick={(e) => handleOnClick({ event: e, path: "/map" })}
        title="map view"
        disabled={isDisabled === "/map"}
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
        disabled={isDisabled === "/grid"}
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
        disabled={isDisabled === "/list"}
      >
        <IconListDetails />
      </Button>
      {mainView && <PueblosSearch />}
    </div>
  );
};
