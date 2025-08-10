import { headers } from "next/headers";

const isMobileRequest = async ()=> {
  const userAgent = (await headers()).get("user-agent") || "";
  console.log("Jaimes's headers", userAgent)
  return /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);
}

export default isMobileRequest
