"use client";
import { PasswordInput, TextInput, Card } from "@mantine/core";
import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/utils/client";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async () => {
    setError(""); // Clear previous errors

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  };

  const handleSignup = async () => {
    setError(""); // Clear previous errors

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <div className={styles.container}>
      <Image
        src={"/axolotlPeakPlain.png"}
        width={50}
        height={50}
        alt="Axolotl"
        aria-hidden
        className={styles.logoImg}
      />
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className={styles.cardContainer}
      >
        <TextInput
          id="email"
          mt="md"
          label="Email"
          placeholder="Enter email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordInput
          id="password"
          label="Password"
          description="Create a password"
          placeholder="Please enter password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.button} onClick={handleLogin}>
            Log in
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={handleSignup}
          >
            Sign up
          </button>
        </div>
      </Card>
    </div>
  );
}
