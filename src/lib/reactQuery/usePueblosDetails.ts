// src/lib/reactQuery/usePuebloDetails.ts

import { useQuery } from "@tanstack/react-query";
import { createClient } from "../supabase/utils/client";

const supabase = createClient();

const fetchPueblosDetails = async (puebloIds: string[]) => {
  if (!puebloIds || puebloIds.length === 0) return [];

  const { data, error } = await supabase
    .from("pueblo_thing_details")
   .select(`
    *,
    pueblos_magicos(title),
    categories(title, type, url_link)
  `)
    .in("pueblo_id", puebloIds).order("title", { referencedTable: "pueblos_magicos", ascending: true });

  if (error) throw error;
  return data;
};

 const usePueblosDetails = (puebloIds: string[]) => {
  return useQuery({
    queryKey: ["pueblo_details_list", puebloIds],
    queryFn: () => fetchPueblosDetails(puebloIds),
    enabled: puebloIds.length > 0,
  });
};

export default usePueblosDetails
