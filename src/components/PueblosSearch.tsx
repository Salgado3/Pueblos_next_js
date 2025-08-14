"use client";
import { useState } from "react";
import { Select } from "@mantine/core";
import { airports } from "./airportData";
import { usePueblosContext } from "@/app/context/PueblosContext";

export const PueblosSearch = () => {
  const [value, setValue] = useState<string>("");
  const airportOptions = airports.map((airport) => ({
    label: airport.label,
    value: airport.value,
  }));
  const { setAirportId } = usePueblosContext();

  return (
    <Select
      checkIconPosition="right"
      placeholder="Filter by Airport"
      comboboxProps={{ shadow: "md", width: 200, zIndex: "9999" }}
      data={airportOptions}
      value={value}
      nothingFoundMessage="Nothing found..."
      onChange={(selectedAirportId) => {
        setValue(selectedAirportId || "");
        setAirportId(selectedAirportId || "");
      }}
    />
  );
};
