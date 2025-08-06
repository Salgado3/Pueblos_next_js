"use client";

import usePueblos from "@/lib/reactQuery/usePueblos";
import { usePueblosContext } from "@/app/hooks/PueblosContext";

export function useFilteredPueblos() {
  const { data = [], isLoading } = usePueblos();
  const { airportId } = usePueblosContext();
  if (!airportId) {
    return { filteredPueblos: data, isLoading };
  }
  const filtered = data.filter((pueblo) => {
    const matchesAirport = airportId ? pueblo.airport_id === airportId : true;

    return matchesAirport;
  });

  return { filteredPueblos: filtered, isLoading };
}
