// app/map/MapClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// this is only allowed in client components!
const PuebloClient = dynamic(() => import("./PueblosClient"), { ssr: false });

export default function PuebloClientWrapper() {
  return <PuebloClient />;
}
