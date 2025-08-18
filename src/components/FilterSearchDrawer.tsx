"use client";

import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FilterByStateSearch from "./FilterByStateSearch";
import { FilterByAirportSearch } from "./FilterByAirportSearch";
import { usePueblosContext } from "@/app/context/PueblosContext";

import styles from "./filterSearchDrawer.module.css";
import LoadingOverlay from "./LoadingOverlay";

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
        title="Filters"
        zIndex={1002}
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
          Reset filters{" "}
        </Button>
      </Drawer>
      <Button variant="default" onClick={open} className={styles.button}>
        Filter
      </Button>
    </div>
  );
};

export default FilterSearchDrawer;
