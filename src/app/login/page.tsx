"use client";
import { PasswordInput, TextInput, Card, Title, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/utils/client";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const showLoadingNotification = () => {
    return notifications.show({
      loading: true,
      title: "Processing request",
      message: "Please wait...",
      autoClose: false,
      withCloseButton: false,
      position: "top-center",
    });
  };

  const updateSuccessNotification = (
    id: string,
    title: string,
    message: string
  ) => {
    notifications.update({
      id,
      color: "teal",
      title: title,
      message: message,
      icon: <IconCheck size={18} />,
      loading: false,
      autoClose: 2000,
      position: "top-center",
    });
  };

  const updateErrorNotification = (id: string, message: string) => {
    notifications.update({
      id,
      loading: false,
      color: "red",
      title: "Something went wrong",
      message: message,
      autoClose: 2000,
      position: "top-center",
    });
  };

  const handleLogin = async () => {
    const id = showLoadingNotification();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      updateErrorNotification(id, "Invalid email or password.");
    } else {
      updateSuccessNotification(
        id,
        "Login successful!",
        "Redirecting to your dashboard."
      );
      router.push("/");
    }
  };

  const handleSignup = async () => {
    const id = showLoadingNotification();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      updateErrorNotification(id, "An error occurred during sign up. Please try again.");
    } else {
      // The user is NOT logged in after sign-up, so we don't redirect.
      // Instead, we show a success message and prompt them to check their email.
      updateSuccessNotification(
        id,
        "Sign up successful!",
        "Please check your email to confirm your account."
      );
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
        <Title>Welcome!</Title>
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
