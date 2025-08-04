"use client";

import { useRouter } from "next/navigation";
import { Button, PasswordInput, TextInput, Card } from "@mantine/core";
import { useState } from "react";
import { createClient } from "@/lib/supabase/utils/client"; // Adjust path
import styles from "./page.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Login error:", error.message);
      return;
    }
    router.push("/about");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Signup error:", error.message);
      return;
    }
    router.push("/about");
  };

  return (
    <div className={styles.container}>
      <img
        src="/AxolotlPeakPlain.png"
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
            mt="md"
            label="Email"
            placeholder="Enter email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            description="Create a password"
            placeholder="Please enter password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button
            className={styles.button}
            variant="filled"
            radius="lg"
            onClick={handleLogin}
          >
            Log in
          </Button>
          <Button
            className={styles.button}
            variant="filled"
            radius="lg"
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </form>
      </Card>
    </div>
  );
}
