import MapClientWrapper from "./MapClientWrapper";
import { createClient } from "@/lib/supabase/utils/server";

export default async function MapPage() {
  const supabase = await createClient();
  const { data: pueblos, error } = await supabase
    .from("pueblos_magicos")
    .select("*")
    .order("title", { ascending: false });

  if (error) {
    return <div>Error loading pueblos</div>;
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapClientWrapper pueblos={pueblos} />
    </div>
  );
}
