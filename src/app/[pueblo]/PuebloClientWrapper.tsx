"use client";

import dynamic from "next/dynamic";

const PuebloClient = dynamic(() => import("./PueblosClient"), { ssr: false });

export default function PuebloClientWrapper() {
  return <PuebloClient />;
}
