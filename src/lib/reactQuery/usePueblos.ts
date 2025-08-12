"use client";

import { type DefinedUseQueryResult, type UseQueryResult, useQuery } from "@tanstack/react-query";
import { createClient } from "../supabase/utils/client";
import { type Database } from "../../../database.types";



const usePueblos = ():UseQueryResult<Database["public"]["Tables"]["pueblos_magicos"]["Row"][] | Error> => {
  const supabase = createClient();
  //@ts-ignore
  return useQuery({
    queryKey: ["pueblos"],
    queryFn: async ()=> {
      const { data, error } = await supabase
        .from("pueblos_magicos")
        .select("*")
        .order("title", { ascending: true });
      if (error) {
        throw new Error(error.message); // Use the error message for better debugging
      }


      return data ?? [];
    },
    staleTime: Infinity, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
  });
}

export default usePueblos
