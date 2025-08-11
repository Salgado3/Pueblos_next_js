"use client";
import { createClient } from "@/lib/supabase/utils/client";
import { Burger, NavLink, Title, useComputedColorScheme } from "@mantine/core";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import ColorSchemeToggle from "./ColorSchemeToggle";

import styles from "./mobileNavBar.module.css";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const handleClick = () => {
    setIsOpen((e) => !e);
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div>
      <div className={styles.titleContainer}>
        <Image
          src={
            computedColorScheme === "dark"
              ? "/axolotl.png"
              : "/axolotlSunglasses.png"
          }
          alt="axolotl"
          aria-hidden
          width={40}
          height={40}
          className={
            computedColorScheme === "dark"
              ? styles.logoImg
              : styles.logoImgSunglasses
          }
        />
        <Title order={2} className={styles.logo}>
          Querido Pueblos
        </Title>
        <ColorSchemeToggle />
      </div>
      <NavLink
        href="#required-for-focus"
        label={
          <Burger
            style={{ width: "80%" }}
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
    </div>
  );
};

export default MobileNavBar;
