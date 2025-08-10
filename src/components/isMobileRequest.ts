import { headers } from "next/headers";

const isMobileRequest = async ()=> {
  const userAgent = (await headers()).get("user-agent") || "";
  return /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);
}

export default isMobileRequest
