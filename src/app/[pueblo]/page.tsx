"use client";

import PuebloClientWrapper from "./PuebloClientWrapper";
import PueblosClient from "./PueblosClient";

export default function Page({ params }: { params: { slug: string } }) {
  console.log("jaimes params", params);
  return <PuebloClientWrapper />;
}
