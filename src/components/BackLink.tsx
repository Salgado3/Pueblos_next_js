"use client";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";
import { IconArrowNarrowLeft, IconCheck } from "@tabler/icons-react";

const BackLink = () => {
  const router = useRouter();
  return (
    <Button
      variant="transparent"
      color="blue"
      leftSection={<IconArrowNarrowLeft />}
      onClick={() => router.back()}
    >
      <span>Go back</span>
    </Button>
  );
};

export default BackLink;
