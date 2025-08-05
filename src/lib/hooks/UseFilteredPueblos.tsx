"use client";

import { usePueblos } from "@/lib/reactQuery/usePueblos";
import { usePueblosContext } from "@/app/hooks/PueblosContext";

export function useFilteredPueblos() {
  const { data = [], isLoading } = usePueblos();
  const { airportId, searchQuery } = usePueblosContext();

  const filtered = data.filter((pueblo) => {
    const matchesAirport = airportId ? pueblo.airport_id === airportId : true;
    const matchesSearch = pueblo.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesAirport && matchesSearch;
  });

  return { filteredPueblos: filtered, isLoading };
}
