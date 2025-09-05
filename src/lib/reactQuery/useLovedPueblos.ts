import { createClient } from "../supabase/utils/client";
import { type Database } from "../../../database.types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const useLovedPueblos = (likedPuebloIds: string[]):UseQueryResult<Database["public"]["Tables"]["pueblos_magicos"]["Row"][] | Error> => {

  return useQuery({
    queryKey: ["liked_pueblos", likedPuebloIds],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("pueblos_magicos")
        .select("*")
        .in("id", likedPuebloIds);
      if (error) throw error;
      return data;
    },
    // The query will only run when likedPuebloIds is available and not empty
    enabled: !!likedPuebloIds && likedPuebloIds.length > 0,
  });
}

export default useLovedPueblos
