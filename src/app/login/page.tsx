"use client";
import { TextInput, Card, Title, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/utils/client";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";

import styles from "./page.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loadingStatus, setIsLoadingStatus] = useState<{
    loading: boolean;
    button: "login" | "signup" | "";
  }>({ loading: false, button: "" });
  const [captchaToken, setCaptchaToken] = useState("");
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
    if (!email) {
      notifications.show({
        withCloseButton: true,
        title: "Error",
        message: "Valid Email Required",
        color: "red",
        position: "bottom-center",
      });
      return;
    }
    const id = showLoadingNotification();
    setIsLoadingStatus({ loading: true, button: "login" });
    //TODO fix other error messages when no redirecting
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: "", captchaToken },
    });

    if (error) {
      updateErrorNotification(id, "Invalid email, try again");
      setIsLoadingStatus({ loading: false, button: "" });

      return;
    }

    updateSuccessNotification(
      id,
      "A link to login has been sent to your email",
      "Please check your spam folder if you do not see it in your inbox"
    );

    setIsLoadingStatus({ loading: false, button: "" });
    await queryClient.invalidateQueries({ queryKey: ["pueblos"] });
    router.push("/");
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
        <Turnstile
          options={{ size: "compact" }}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
          onSuccess={(token) => {
            if (disableButton) {
              setDisableButton(false);
            }
            if (typeof token === "string") setCaptchaToken(token);
          }}
          onError={() => setDisableButton(true)}
        />
        <div className={styles.buttonGroup}>
          <Button
            className={styles.button}
            onClick={handleLogin}
            loading={loadingStatus.loading && loadingStatus.button === "login"}
            disabled={disableButton}
            fullWidth
          >
            Send Magic Link
          </Button>
        </div>
      </Card>
    </div>
  );
}
