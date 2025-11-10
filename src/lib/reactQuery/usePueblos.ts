"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { createClient } from "../supabase/utils/client";
import { type Database } from "../../../database.types";

const usePueblos = (): UseQueryResult<
  Database["public"]["Tables"]["pueblos_magicos"]["Row"][]
> => {
  const supabase = createClient();
  //@ts-ignore
  return useQuery({
    queryKey: ["pueblos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pueblos_magicos")
        .select(
          "airport_id, cloudinary_id, country, description, description_url, image, latitude, longitude, photo_by, photo_by_url, state, title, id",
        )
        .order("title", { ascending: true });
      if (error) {
        throw new Error(error.message); // Use the error message for better debugging
      }

      return data ?? [];
    },
    staleTime: Infinity, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
  });
};

export default usePueblos;
