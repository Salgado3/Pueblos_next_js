"use client";
import { useState } from "react";

import { type ComboboxItem, Select } from "@mantine/core";
import { usePueblos } from "@/lib/reactQuery/usePueblos";
import { airports } from "./airportData";
import { useSearchParams } from "next/navigation";
import { usePueblosContext } from "@/app/hooks/PueblosContext";

export const PueblosSearch = () => {
  const [value, setValue] = useState<ComboboxItem>();
  const airportOptions = airports.map((airport) => ({
    label: airport.label,
    value: airport.value,
  }));
  const { setAirportId } = usePueblosContext();

  return (
    <Select
      style={{ border: "1px solid red", marginLeft: "1rem" }}
      checkIconPosition="right"
      placeholder="Filter by Airport"
      comboboxProps={{ shadow: "md", width: 200, zIndex: "9999" }}
      data={airportOptions}
      value={value ? value.value : null}
      searchable
      nothingFoundMessage="Nothing found..."
      onChange={(options, search) => {
        console.log("Jaimes ", options, search);
        setAirportId(options);
        setValue(search?.label);
      }}
    />
  );
};
