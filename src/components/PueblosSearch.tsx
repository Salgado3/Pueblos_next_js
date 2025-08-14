"use client";
import { useState } from "react";
import { Select } from "@mantine/core";
import { airports } from "./airportData";
import { usePueblosContext } from "@/app/context/PueblosContext";

export const PueblosSearch = () => {
  const airportOptions = airports.map((airport) => ({
    label: airport.label,
    value: airport.value,
  }));
  const { airportName, setAirportName, setAirportId, isLoading } =
    usePueblosContext();

  if (isLoading) return;
  return (
    <Select
      checkIconPosition="right"
      placeholder="Filter by Airport"
      comboboxProps={{ shadow: "md", width: 200, zIndex: "9999" }}
      data={airportOptions}
      value={airportName}
      nothingFoundMessage="Nothing found..."
      onChange={(selectedAirportId) => {
        setAirportName(selectedAirportId || "");
        setAirportId(selectedAirportId || "");
      }}
    />
  );
};
