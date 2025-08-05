// app/hooks/PueblosContext.tsx
"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { usePueblos } from "@/lib/reactQuery/usePueblos";

const PueblosContext = createContext(null);

export const PueblosProvider = ({ children }) => {
  const { data: allPueblos = [], isLoading } = usePueblos();
  const [airportId, setAirportId] = useState("");

  const filteredPueblos = useMemo(() => {
    if (!airportId) return allPueblos;
    return allPueblos.filter((pueblo) => pueblo.airport_id === airportId);
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
