"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "../supabase/utils/client";

export function usePueblos() {
  const supabase = createClient();
  
  return useQuery({
    queryKey: ["pueblos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pueblos_magicos")
        .select("*")
        .order("title", { ascending: false });
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 2, // 2 hours
  });
}
