"use client";

import Link from "next/link";
import { Title, useComputedColorScheme } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/utils/client";
import styles from "./navbar.module.css";
import ColorSchemeToggle from "./ColorSchemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data.user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftLinks}>
        <img
          src={
            computedColorScheme === "dark"
              ? "/axolotl.png"
              : "/axolotlSunglasses.png"
          }
          alt="Axolotl"
          aria-hidden
          className={styles.logoImg}
        />
        <Title order={2} className={styles.logo}>
          Pueblo Magicos
        </Title>
        <Link href="/about" className={styles.link}>
          About
        </Link>

        <Link href="/" className={styles.link}>
          Home
        </Link>
      </div>

      <div className={styles.rightLinks}>
        {isLoggedIn ? (
          <>
            <Link href="/profile" className={styles.link}>
              Profile
            </Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className={styles.link}>
            Login
          </Link>
        )}
        <ColorSchemeToggle />
      </div>
    </nav>
  );
}
