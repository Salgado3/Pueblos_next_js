import MapClient from "./MapClient";
import MapClientWrapper from "./MapClientWrapper";
import fetchImages from "@/lib/supabase/fetchImages";

export default async function MapPage() {
  const { data: pueblos, error } = await fetchImages();

  if (error) {
    return <div>Error loading pueblos: {error.message}</div>;
  }
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapClientWrapper pueblos={pueblos} />
    </div>
  );
}
