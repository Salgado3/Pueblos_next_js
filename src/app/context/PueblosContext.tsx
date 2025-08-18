// app/hooks/PueblosContext.tsx
"use client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import usePueblos from "@/lib/reactQuery/usePueblos";
import { type Database } from "../../../database.types";

interface PueblosContextValue {
  allPueblos: Database["public"]["Tables"]["pueblos_magicos"]["Row"][];
  filteredPueblos: Database["public"]["Tables"]["pueblos_magicos"]["Row"][];
  airportId: string[];
  setAirportId: (id: string[]) => void;
  airportName: string[];
  setAirportName: (name: string[]) => void;
  stateArray: string[];
  setstateArray: (value: string[]) => void;
  isLoading: boolean;
}
//@ts-ignore
const PueblosContext = createContext<PueblosContextValue>();

interface PueblosProviderProps {
  children: ReactNode;
}

export const PueblosProvider = ({ children }: PueblosProviderProps) => {
  const [airportId, setAirportId] = useState<string[]>([]);
  const [airportName, setAirportName] = useState<string[]>([]);
  const [stateArray, setstateArray] = useState<string[]>([]);
  const { data: allPueblos, isLoading, isError, error } = usePueblos();
  if (isError || error) throw new Error(error.message);

  const filteredPueblos = useMemo(() => {
    if (!Array.isArray(allPueblos)) {
      return [];
    }

    // Check if either filter is active
    const isAirportFilterActive = airportId.length > 0;
    const isStateFilterActive = stateArray.length > 0;

    // If no filters are active, return the full list
    if (!isAirportFilterActive && !isStateFilterActive) {
      return allPueblos;
    }

    // Apply a single filter with OR logic
    const pueblosToFilter = allPueblos.filter((pueblo) => {
      const matchesAirport =
        isAirportFilterActive && airportId.includes(pueblo?.airport_id || "");
      const matchesState =
        isStateFilterActive && stateArray.includes(pueblo?.state || "");

      return matchesAirport || matchesState;
    });

    return pueblosToFilter;
  }, [allPueblos, airportId, stateArray]);
  return (
    <PueblosContext.Provider
      value={{
        //@ts-ignore
        allPueblos,
        filteredPueblos,
        airportId,
        setAirportId,
        airportName,
        stateArray,
        setAirportName,
        setstateArray,
        isLoading,
      }}
    >
      {children}
    </PueblosContext.Provider>
  );
};

export const usePueblosContext = () => useContext(PueblosContext);
