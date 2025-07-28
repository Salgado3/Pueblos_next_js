// pages/api/images.ts
import { createServerClient } from "@supabase/ssr/dist/main/createServerClient";
import type { NextApiRequest, NextApiResponse } from "next";

import { cookies } from "next/headers";
import { createClient } from "./utils/client";

const fetchImages = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("images")
    .select("id, url, title")
    .order("created_at", { ascending: false });

  if (error) throw Error(String(error));

  return data;
};

export default fetchImages;
