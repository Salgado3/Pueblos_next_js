"use client";
import { createClient } from "@/lib/supabase/utils/client";
import { Burger, NavLink } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleClick = () => {
    setIsOpen((e) => !e);
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <NavLink
      href="#required-for-focus"
      label={
        <Burger
          style={{ width: "100%" }}
          opened={isOpen}
          onClick={handleClick}
          aria-label="Toggle navigation"
        />
      }
    >
      <NavLink label="About" href="/about" />
      <NavLink label="Profile" href="/profile" />
      <NavLink
        label="Logout"
        href="#required-for-focus"
        onClick={handleLogout}
      />
    </NavLink>
  );
};

export default MobileNavBar;
