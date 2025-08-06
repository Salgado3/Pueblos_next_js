"use client";

import { type DefinedUseQueryResult, type UseQueryResult, useQuery } from "@tanstack/react-query";
import { createClient } from "../supabase/utils/client";
import { type Pueblo } from "../../../database.types";


const usePueblos= ():UseQueryResult<Pueblo[], Error> => {
  const supabase = createClient();
  //@ts-ignore
  return useQuery<Pueblo[], Error>({
    queryKey: ["pueblos"],
    queryFn: async ()=> {
      const { data, error } = await supabase
        .from("pueblos_magicos")
        .select("*")
        .order("title", { ascending: false });
      if (error) throw error;

      return data ?? [];
    },
    staleTime: Infinity, // 1 hour
    //@ts-ignore
    cacheTime: 1000 * 60 * 60 * 2, // 2 hours
  });
}

export default usePueblos
