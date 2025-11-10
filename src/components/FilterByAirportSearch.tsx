"use client";
import { MultiSelect } from "@mantine/core";
import { airports } from "./airportData";
import { usePueblosContext } from "@/app/context/PueblosContext";

export const FilterByAirportSearch = () => {
  const airportOptions = airports.map((airport) => ({
    label: airport.label,
    value: airport.value,
  }));
  const { airportName, setAirportName, setAirportId, isLoading } =
    usePueblosContext();

  if (isLoading) return;

  const handleOnChange = (value: string[]) => {
    setAirportName(value);
    setAirportId(value);
  };
  return (
    <MultiSelect
      style={{ marginRight: "1rem" }}
      checkIconPosition="left"
      label="Filter by Airport"
      placeholder="Filter by Airport"
      data={airportOptions}
      value={airportName}
      nothingFoundMessage="Nothing found..."
      comboboxProps={{
        transitionProps: { transition: "pop", duration: 200 },
        zIndex: "1002",
      }}
      onChange={(value) => handleOnChange(value)}
    />
  );
};
