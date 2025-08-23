"use client";

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import LoadingOverlay from "./LoadingOverlay";
import { usePueblosContext } from "@/app/context/PueblosContext";
import { Button, NavLink } from "@mantine/core";
import { IconFilterPin } from "@tabler/icons-react";
import { FilterByAirportSearch } from "./FilterByAirportSearch";
import FilterByStateSearch from "./FilterByStateSearch";

import styles from "./filterNavBar.module.css";

const FilterNavBar = () => {
  const isMobile = useMediaQuery("(max-width: 600px)", true);
  const [opened, { toggle }] = useDisclosure();
  const { setAirportId, setAirportName, setstateArray, isLoading } =
    usePueblosContext();

  const handleFilterReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setAirportId([]);
    setAirportName([]);
    setstateArray([]);
  };
  if (isLoading) return <LoadingOverlay />;

  return (
    <NavLink
      styles={{
        label: { fontSize: "1rem", fontWeight: "600" },
      }}
      leftSection={<IconFilterPin />}
      label="Add Filters"
    >
      {" "}
      <FilterByAirportSearch />
      <FilterByStateSearch />
      <Button
        className={styles.drawerButton}
        variant="default"
        onClick={handleFilterReset}
      >
        Reset filters
      </Button>
    </NavLink>
  );
};

export default FilterNavBar;
