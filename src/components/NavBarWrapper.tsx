"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@mantine/hooks";

const MobileNavBar = dynamic(() => import("./MobileNavBar"), { ssr: false });
const NavBar = dynamic(() => import("./NavBar"), { ssr: false });

const NavBarWrapper = () => {
  const isMobile = useMediaQuery("(max-width: 500px)");
  return isMobile ? <MobileNavBar /> : <NavBar />;
};

export default NavBarWrapper;
