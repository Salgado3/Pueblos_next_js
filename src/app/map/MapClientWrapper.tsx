// app/map/MapClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// this is only allowed in client components!
const MapClient = dynamic(() => import("./MapClient"), { ssr: false });

export default function MapClientWrapper() {
  return <MapClient />;
}
