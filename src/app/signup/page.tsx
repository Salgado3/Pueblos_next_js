"use client";
import { useState } from "react";
import { Button, Card, PasswordInput, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/utils/client";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";
import { IconArrowNarrowRight, IconCheck } from "@tabler/icons-react";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const isFormValid =
    username.length > 0 &&
    email.length > 0 &&
    email.includes("@") &&
    password.length > 0 &&
    password === confirmPassword;
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

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      notifications.show({
        withCloseButton: true,
        title: "Validation Error",
        message: "Email and password are required. Make sure password matches",
        color: "red",
        position: "bottom-center",
      });
      return;
    }
    const id = showLoadingNotification();
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username,
        },
      },
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
    setIsLoading(false);
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
        <TextInput
          className={styles.usernameInput}
          id="username"
          mt="md"
          label="username"
          placeholder="Enter a username"
          description="Enter a username"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <TextInput
          className={styles.emailInput}
          id="email"
          mt="md"
          label="Email"
          placeholder="Enter email"
          description="Enter your email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordInput
          className={styles.passwordInput}
          id="password"
          label="Password"
          description="Create a password"
          placeholder="Please enter password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <PasswordInput
          className={styles.confirmPasswordInput}
          id="confirm_password"
          label="Confirm Password"
          description="Confirm password"
          placeholder="Please reenter password"
          name="confirm_password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />
        <Link href={"/login"} className={styles.link}>
          <span>Back to login</span>
          <IconArrowNarrowRight />
        </Link>
        <div className={styles.buttonContainer}>
          <Button
            type="button"
            className={styles.button}
            onClick={handleSignup}
            loading={isLoading}
            disabled={!isFormValid}
          >
            Sign up
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;
