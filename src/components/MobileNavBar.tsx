"use client";
import { createClient } from "@/lib/supabase/utils/client";
import { Burger, NavLink, Title, useComputedColorScheme } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import ColorSchemeToggle from "./ColorSchemeToggle";

import styles from "./mobileNavBar.module.css";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navBarImg, setNavBarImg] = useState(() => "/axolotlLove.png");
  const [logoClass, setLogoClass] = useState(styles.logoImg);
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    if (computedColorScheme === "dark") {
      setNavBarImg("/axolotlLove.png");
      setLogoClass(styles.logoImg);
    } else {
      setNavBarImg("/axolotlSunglasses.png");
      setLogoClass(styles.logoImgSunglasses);
    }
  }, [computedColorScheme]);

  const handleClick = () => {
    setIsOpen((e) => !e);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <NavLink
        href="#required-for-focus"
        disableRightSectionRotation={true}
        leftSection={
          <Burger
            style={{ width: "100%" }}
            opened={isOpen}
            onClick={handleClick}
            aria-label="Toggle navigation"
          />
        }
        label={
          <div className={styles.titleContainer} onClick={handleClick}>
            <Image
              src={navBarImg}
              alt="axolotl"
              aria-hidden
              width={40}
              height={40}
              className={logoClass}
            />

            <Title order={2} className={styles.logo}>
              Querido Pueblos
            </Title>
          </div>
        }
        rightSection={<ColorSchemeToggle />}
      >
        <NavLink
          disabled={pathname.includes("/login")}
          label="About"
          href="/about"
        />
        <NavLink
          disabled={pathname.includes("/login")}
          label="Profile"
          href="/profile"
        />
        {!pathname.includes("/login") && (
          <NavLink
            label="Logout"
            href="#required-for-focus"
            onClick={handleLogout}
          />
        )}
      </NavLink>
    </div>
  );
};

export default MobileNavBar;
