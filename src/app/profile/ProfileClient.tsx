import { createClient } from "@/lib/supabase/utils/client";
import React, { useEffect, useState } from "react";

import { Title } from "@mantine/core";
import styles from "./profileClient.module.css";
import ProgressRing from "./components/ProgressRing";
import LikedPueblos from "./components/LikedPueblos";
const ProfileClient = () => {
  const supabase = createClient();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
    const getUserLikes = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error && user !== null) throw error;
      if (!user?.id) return null;
      const { data } = await supabase
        .from("liked")
        .select("*")
        .eq("user_id", user.id);
    };
    getUserLikes();
  }, [supabase]);

  if (!hasMounted) return null;
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        {/* <Title>Welcome!</Title>{" "} */}
      </div>
      {/* <Title order={2}>Visited</Title> */}
      {/* <ProgressRing /> */}
      <LikedPueblos />
    </div>
  );
};

export default ProfileClient;
