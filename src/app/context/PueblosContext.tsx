// app/hooks/PueblosContext.tsx
"use client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import usePueblos from "@/lib/reactQuery/usePueblos";
import { type Database } from "../../../database.types";

interface PueblosContextValue {
  allPueblos: Database["public"]["Tables"]["pueblos_magicos"]["Row"][];
  filteredPueblos: Database["public"]["Tables"]["pueblos_magicos"]["Row"][];
  airportId: string;
  setAirportId: (id: string) => void;
  airportName: string;
  setAirportName: (name: string) => void;
  setstateArray: (value: string[]) => void;
  isLoading: boolean;
}
//@ts-ignore
const PueblosContext = createContext<PueblosContextValue>();

interface PueblosProviderProps {
  children: ReactNode;
}

export const PueblosProvider = ({ children }: PueblosProviderProps) => {
  const [airportId, setAirportId] = useState("");
  const [airportName, setAirportName] = useState("");
  const [stateArray, setstateArray] = useState<string[]>([]);

  const { data: allPueblos, isLoading, isError, error } = usePueblos();
  if (isError || error) throw new Error(error.message);

  const filteredPueblos = useMemo(() => {
    if (!Array.isArray(allPueblos)) {
      return [];
    }
    let pueblosToFilter = allPueblos;

    if (airportId) {
      pueblosToFilter = pueblosToFilter?.filter(
        (pueblo) => pueblo.airport_id === airportId
      );
    }

    if (stateArray.length > 0) {
      pueblosToFilter = pueblosToFilter?.filter((pueblo) =>
        stateArray.includes(pueblo?.state || "")
      );
    }

    // If no filters are active, return the full list.
    return pueblosToFilter || [];
  }, [allPueblos, airportId, stateArray]);

  return (
    <PueblosContext.Provider
      value={{
        //@ts-ignore
        allPueblos,
        //@ts-ignore
        filteredPueblos,
        airportId,
        setAirportId,
        airportName,
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
