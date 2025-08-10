"use client";
import { PasswordInput, TextInput, Card, Title, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/utils/client";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";
import { position } from "@cloudinary/url-gen/qualifiers/timeline";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async () => {
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      const id = notifications.show({
        loading: true,
        title: "Loading your data",
        message: "Data will be loaded in 3 seconds, you cannot close this yet",
        autoClose: false,
        withCloseButton: false,
      });

      setTimeout(() => {
        notifications.update({
          id,
          color: "teal",
          title: "Data was loaded",
          message:
            "Notification will close in 2 seconds, you can close this notification now",
          icon: <IconCheck size={18} />,
          loading: false,
          autoClose: 2000,
        });
        router.push("/");
      }, 3000);
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
          <Button type="button" className={styles.button} onClick={handleLogin}>
            Log in
          </Button>
          <Button
            type="button"
            className={styles.button}
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </div>
      </Card>
    </div>
  );
}
