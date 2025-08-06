"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  PasswordInput,
  TextInput,
  Card,
  useComputedColorScheme,
} from "@mantine/core";
import { useState } from "react";
import { createClient } from "@/lib/supabase/utils/client"; // Adjust path
import styles from "./page.module.css";
import { login, signup } from "./actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  return (
    <div className={styles.container}>
      <img
        src={
          computedColorScheme === "dark"
            ? "/AxolotlPeakPlain.png"
            : "/AxolotlPeakSunglasses.png"
        }
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
        <form>
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
          <button className={styles.button} formAction={login}>
            Log in
          </button>
          <button className={styles.button} formAction={signup}>
            Sign up
          </button>
        </form>
      </Card>
    </div>
  );
}
