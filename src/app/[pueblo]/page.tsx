import fetchImages from "@/lib/supabase/fetchImages";
import { notFound } from "next/navigation";

export default async function PuebloPage({
  params,
}: {
  params: { pueblo: string };
}) {
  //TODO Fix
  const slug = params.pueblo; // e.g., "jerez_de_garcía_salinas"

  // Optionally normalize for lookup:
  const name = slug.replace(/_/g, " ").toLowerCase();

  // Fetch pueblo data (from DB or static data)
  const data = await fetchImages(); // implement this yourself

  if (!data) return notFound();

  return (
    <main>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      {/* Add more pueblo data here */}
    </main>
  );
}
