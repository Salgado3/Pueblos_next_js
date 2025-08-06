"use client";

import dynamic from "next/dynamic";

// this is only allowed in client components!
const ListClient = dynamic(() => import("./ListClient"), { ssr: false });

export default function ListClientWrapper() {
  return <ListClient />;
}
