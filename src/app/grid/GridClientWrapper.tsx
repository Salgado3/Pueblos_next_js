"use client";

import dynamic from "next/dynamic";

// this is only allowed in client components!
const GridClient = dynamic(() => import("./GridClient"), { ssr: false });

type Pueblo = {
  title: string;
  latitude: number;
  longitude: number;
};
export default function MapClientWrapper({ pueblos }: { pueblos: Pueblo[] }) {
  return <GridClient />;
}
