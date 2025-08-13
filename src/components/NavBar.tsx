"use client";

import Link from "next/link";
import { Title, useComputedColorScheme } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/utils/client";
import styles from "./navbar.module.css";
import ColorSchemeToggle from "./ColorSchemeToggle";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };
  const isLoginPage = pathname === "/login";
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftLinks}>
        <div className={styles.titleContainer}>
          <Image
            src={
              computedColorScheme === "dark"
                ? "/axolotlLove.png"
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
        </div>

        {!isLoginPage && (
          <Link href="/about" className={styles.link}>
            About
          </Link>
        )}
      </div>

      <div className={styles.rightLinks}>
        {!isLoginPage && (
          <>
            <Link href="/profile" className={styles.link}>
              Profile
            </Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        )}
        <ColorSchemeToggle />
      </div>
    </nav>
  );
}
