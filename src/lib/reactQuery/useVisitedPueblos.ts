import { createClient } from "../supabase/utils/client";
import { type Database } from "../../../database.types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const useVisitedPueblos = (visitedPueblosId: string[]):UseQueryResult<Database["public"]["Tables"]["pueblos_magicos"]["Row"][] | Error> => {

  return useQuery({
    queryKey: ["visited_pueblos", visitedPueblosId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("pueblos_magicos")
        .select("*")
        .in("id", visitedPueblosId);
      if (error) throw error;
      return data;
    },
    // The query will only run when visitedPueblosId is available and not empty
    enabled: !!visitedPueblosId && visitedPueblosId.length > 0,
  });
}

export default useVisitedPueblos
