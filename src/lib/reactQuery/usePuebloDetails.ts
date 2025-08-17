// src/lib/reactQuery/usePuebloDetails.ts

import { useQuery } from "@tanstack/react-query";
import { createClient } from "../supabase/utils/client";

const supabase = createClient();

const fetchPuebloDetails = async (puebloId: string) => {
  if (!puebloId) return null;

  const { data, error } = await supabase
    .from("pueblo_thing_details")
    .select("*, categories(title)")
    .eq("pueblo_id", puebloId);

  if (error) throw error;
  return data;
};

const usePuebloDetails = (puebloId: string) => {
  return useQuery({
    queryKey: ["pueblo_details", puebloId],
    queryFn: () => fetchPuebloDetails(puebloId),
    enabled: !!puebloId,
  });
};

export default usePuebloDetails
