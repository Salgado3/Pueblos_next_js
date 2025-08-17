"use client";
import { PasswordInput, TextInput, Card, Title, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { IconArrowNarrowRight, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/utils/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "./page.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingStatus, setIsLoadingStatus] = useState<{
    loading: boolean;
    button: "login" | "signup" | "";
  }>({ loading: false, button: "" });
  const isFormValid =
    email.length > 0 && email.includes("@") && password.length > 0;
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
      withCloseButton: true,
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
      withCloseButton: true,
      position: "bottom-center",
    });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      notifications.show({
        withCloseButton: true,
        title: "Validation Error",
        message: "Email and password are required.",
        color: "red",
        position: "bottom-center",
      });
      return;
    }
    const id = showLoadingNotification();
    setIsLoadingStatus({ loading: true, button: "login" });
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      updateErrorNotification(id, "Invalid email or password.");
    }

    updateSuccessNotification(id, "Login successful!", "Redirecting.");

    setIsLoadingStatus({ loading: false, button: "" });
    router.replace("/");
    await queryClient.invalidateQueries({ queryKey: ["pueblos"] });
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
          className={styles.emailInput}
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
          className={styles.passwordInput}
          id="password"
          label="Password"
          description=""
          placeholder="Please enter password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Link href={"/signup"} className={styles.link}>
          <span>sign up here</span>
          <IconArrowNarrowRight />
        </Link>
        <div className={styles.buttonGroup}>
          <Button
            type="button"
            className={styles.button}
            onClick={handleLogin}
            loading={loadingStatus.loading && loadingStatus.button === "login"}
            // disabled={isFormValid}
            fullWidth
          >
            Log in
          </Button>
        </div>
      </Card>
    </div>
  );
}
