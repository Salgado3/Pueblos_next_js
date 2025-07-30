import { createClient } from "./utils/server";

type Image = {
  id: string;
  url: string;
  title: string;
  created_at: string;
};

const fetchImages = async (): Promise<{ data: Image[] | null; error: any }> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("pueblos_magicos").select("*").order("title", { ascending: false });;

  return { data, error };
};

export default fetchImages;
