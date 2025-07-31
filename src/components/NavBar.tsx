"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/utils/client";
import styles from "./navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

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
        <Link href="/" className={styles.logo}>
          🗺️ PuebloMagico
        </Link>

        {pathname !== "/map" && (
          <Link href="/map" className={styles.link}>
            Map
          </Link>
        )}

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
      </div>
    </nav>
  );
}
