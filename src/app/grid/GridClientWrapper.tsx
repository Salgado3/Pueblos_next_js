"use client";

import dynamic from "next/dynamic";

// this is only allowed in client components!
const GridClient = dynamic(() => import("./GridClient"), { ssr: false });

export default function GridClientWrapper() {
  return <GridClient />;
}
