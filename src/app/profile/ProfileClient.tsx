import { createClient } from "@/lib/supabase/utils/client";
import React, { useEffect, useState } from "react";

import { Title } from "@mantine/core";
import styles from "./profileClient.module.css";
import ProgressRing from "./components/ProgressRing";
import LikedPueblos from "./components/LikedPueblos";
import useFetchUserActions from "@/lib/reactQuery/useFetchUserActions";
import { useQuery } from "@tanstack/react-query";
const ProfileClient = () => {
  const supabase = createClient();
  const [hasMounted, setHasMounted] = useState(false);
  const [visited, setVisited] = useState(0);
  const {
    data: authData,
    isLoading: authIsLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5, // Cache the user for 5 minutes
  });

  const {
    data: userActionsData,
    isLoading: userActionsIsLoading,
    error: userActionsError,
  } = useFetchUserActions(authData?.user?.id || "");

  useEffect(() => {
    setHasMounted(true);
    const getUserLikes = async () => {
      setVisited(visitedCount || 0);
    };

    getUserLikes();
  }, [supabase]);

  if (error && authData?.user !== null) throw error;
  if (!authData?.user?.id) return null;

  if (userActionsError) throw new Error(userActionsError.message);
  const visitedCount = userActionsData?.filter(
    (item) => item.action_type === "visited"
  ).length;

  if (!hasMounted) return null;

  return (
    <div className={styles.container}>
      <div className={styles.visitedContainer}>
        <Title order={2}>Visited</Title>
        <ProgressRing valueCount={visited} />
      </div>

      <LikedPueblos />
    </div>
  );
};

export default ProfileClient;
