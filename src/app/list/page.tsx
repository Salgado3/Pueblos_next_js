import { createClient } from "@/lib/supabase/utils/server";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";

import ListClient from "./ListClient";

const page = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("pueblos_magicos")
    .select("*")
    .order("title", { ascending: true });

  if (error) return <div>error...</div>;

  return <ListClient />;
};

export default page;
