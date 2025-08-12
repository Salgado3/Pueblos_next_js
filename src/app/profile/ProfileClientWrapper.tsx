"use client";
import dynamic from "next/dynamic";

const ProfileClient = dynamic(() => import("./ProfileClient"), { ssr: false });

const ProfileClientWrapper = () => {
  return <ProfileClient />;
};

export default ProfileClientWrapper;
