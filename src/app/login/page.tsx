"use client";
import { PasswordInput, TextInput, Card, Title, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/utils/client";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingStatus, setIsLoadingStatus] = useState<{
    loading: boolean;
    button: "login" | "signup" | "";
  }>({ loading: false, button: "" });
  const router = useRouter();
  const supabase = createClient();
  const queryClient = useQueryClient();

  const showLoadingNotification = () => {
    return notifications.show({
      loading: true,
      title: "Processing request",
      message: "Please wait...",
      withCloseButton: false,
      position: "bottom-center",
      autoClose: false,
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
      autoClose: 4000,
      position: "bottom-center",
    });
  };

  const updateErrorNotification = (id: string, message: string) => {
    notifications.update({
      id,
      loading: false,
      color: "red",
      title: "Something went wrong",
      message: message,
      autoClose: 3000,
      position: "bottom-center",
    });
  };

  const handleLogin = async () => {
    const id = showLoadingNotification();
    setIsLoadingStatus({ loading: true, button: "login" });
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      updateErrorNotification(id, "Invalid email or password.");
    }

    updateSuccessNotification(
      id,
      "Login successful!",
      "Redirecting to your dashboard."
    );

    await queryClient.invalidateQueries({ queryKey: ["pueblos"] });
    setIsLoadingStatus({ loading: false, button: "" });
    router.push("/");
  };

  const handleSignup = async () => {
    const id = showLoadingNotification();
    setIsLoadingStatus({ loading: true, button: "signup" });

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      updateErrorNotification(
        id,
        "An error occurred during sign up. Please try again."
      );
    }
    // The user is NOT logged in after sign-up, so we don't redirect.
    // Instead, we show a success message and prompt them to check their email.
    updateSuccessNotification(
      id,
      "Sign up successful!",
      "Please check your email to confirm your account."
    );
    setIsLoadingStatus({ loading: false, button: "" });
  };

  return (
    <div className={styles.container}>
      <Image
        src={"/axolotlPeakPlain.png"}
        width={50}
        height={50}
        alt="axolotl"
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
          <Button
            type="button"
            className={styles.button}
            onClick={handleLogin}
            loading={loadingStatus.loading && loadingStatus.button === "login"}
          >
            Log in
          </Button>
          <Button
            type="button"
            className={styles.button}
            onClick={handleSignup}
            loading={loadingStatus.loading && loadingStatus.button === "signup"}
          >
            Sign up
          </Button>
        </div>
      </Card>
    </div>
  );
}
