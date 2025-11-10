"use client";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";
import { IconArrowNarrowLeft } from "@tabler/icons-react";

const BackLink = () => {
  const router = useRouter();
  return (
    <Button
      style={{ fontSize: "1rem", fontWeight: "600" }}
      variant="transparent"
      color="#DF0A1B"
      leftSection={<IconArrowNarrowLeft />}
      onClick={() => router.back()}
    >
      <span>Go back</span>
    </Button>
  );
};

export default BackLink;
