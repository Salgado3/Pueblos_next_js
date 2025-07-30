// app/map/MapClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// this is only allowed in client components!
const MapClient = dynamic(() => import("./MapClient"), { ssr: false });

type Pueblo = {
  title: string;
  latitude: number;
  longitude: number;
};
export default function MapClientWrapper({ pueblos }: { pueblos: Pueblo[] }) {
  return <MapClient pueblos={pueblos} />;
}
