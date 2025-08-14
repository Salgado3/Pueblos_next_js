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
  const { data: allPueblos, isLoading, isError, error } = usePueblos();
  if (isError || error) throw new Error(error.message);

  const filteredPueblos = useMemo(() => {
    if (!airportId) return allPueblos;
    return (
      //@ts-ignore
      allPueblos?.filter((pueblo) => pueblo.airport_id === airportId) || []
    );
  }, [allPueblos, airportId]);

  return (
    <PueblosContext.Provider
      value={{
        //@ts-ignore
        allPueblos,
        filteredPueblos,
        airportId,
        setAirportId,
        airportName,
        setAirportName,
        isLoading,
      }}
    >
      {children}
    </PueblosContext.Provider>
  );
};

export const usePueblosContext = () => useContext(PueblosContext);
