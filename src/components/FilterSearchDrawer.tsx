"use client";

import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FilterByStateSearch from "./FilterByStateSearch";
import { FilterByAirportSearch } from "./FilterByAirportSearch";
import { usePueblosContext } from "@/app/context/PueblosContext";
import LoadingOverlay from "./LoadingOverlay";
import Image from "next/image";

import styles from "./filterSearchDrawer.module.css";

const FilterSearchDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { setAirportId, setAirportName, setstateArray, isLoading } =
    usePueblosContext();
  const handleReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setAirportId([]);
    setAirportName([]);
    setstateArray([]);
  };
  if (opened && isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className={styles.drawerContainer}>
      <Drawer
        opened={opened}
        onClose={close}
        closeButtonProps={{ "aria-label": "Close drawer" }}
        title={
          <div className={styles.titleContainer}>
            <p>Filter View</p>
            <Image
              src="/axolotlSuitcase.png"
              alt="axolotlSuitcase"
              width={40}
              height={40}
              className={styles.titleImg}
              aria-hidden
            />
          </div>
        }
        zIndex={1001}
        padding={"xl"}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <FilterByAirportSearch />
        <FilterByStateSearch />

        <Button
          className={styles.drawerButton}
          variant="default"
          fullWidth
          onClick={handleReset}
        >
          Reset filters
        </Button>
        <Button
          className={styles.drawerButton}
          variant="default"
          fullWidth
          onClick={close}
        >
          Done
        </Button>
      </Drawer>
      <Button variant="default" onClick={open} className={styles.button}>
        Filter
      </Button>
    </div>
  );
};

export default FilterSearchDrawer;
