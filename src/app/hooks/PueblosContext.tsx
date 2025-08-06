// app/hooks/PueblosContext.tsx
"use client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import usePueblos from "@/lib/reactQuery/usePueblos";
import { Pueblo } from "../../../database.types";

interface PueblosContextValue {
  allPueblos: Pueblo[];
  filteredPueblos: Pueblo[];
  airportId: string;
  setAirportId: (id: string) => void;
  isLoading: boolean;
}
//@ts-ignore
const PueblosContext = createContext<PueblosContextValue>();

interface PueblosProviderProps {
  children: ReactNode;
}

export const PueblosProvider = ({ children }: PueblosProviderProps) => {
  const { data: allPueblos = [], isLoading } = usePueblos();
  const [airportId, setAirportId] = useState("");

  const filteredPueblos = useMemo(() => {
    if (!airportId) return allPueblos;
    return allPueblos?.filter((pueblo) => pueblo.airport_id === airportId);
  }, [allPueblos, airportId]);

  return (
    <PueblosContext.Provider
      value={{
        allPueblos,
        filteredPueblos,
        airportId,
        setAirportId,
        isLoading,
      }}
    >
      {children}
    </PueblosContext.Provider>
  );
};

export const usePueblosContext = () => useContext(PueblosContext);
