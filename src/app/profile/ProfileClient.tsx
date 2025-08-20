import { createClient } from "@/lib/supabase/utils/client";
import React, { useEffect, useState } from "react";
import {
  IconListCheck,
  IconPhotoPlus,
  IconHeartPlus,
  IconMapStar,
} from "@tabler/icons-react";
import ProgressRing from "./components/ProgressRing";
import LikedPueblos from "./components/LikedPueblos";
import useFetchUserActions from "@/lib/reactQuery/useFetchUserActions";
import { useQuery } from "@tanstack/react-query";
import VisitedPueblos from "./components/VisitedPueblos";
import NotFoundOverlay from "@/components/NotFoundOverlay";
import { Tabs, Title } from "@mantine/core";

import styles from "./profileClient.module.css";

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
      //TODO fix
      setVisited(0);
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
    <Tabs radius="sm" variant="outline" defaultValue="Loved_Pueblos">
      <Tabs.List justify="center">
        <Tabs.Tab
          value="Loved_Pueblos"
          leftSection={<IconHeartPlus size={12} />}
        >
          Loved Pueblos
        </Tabs.Tab>
        <Tabs.Tab value="Visited" leftSection={<IconMapStar size={12} />}>
          Visited Pueblos
        </Tabs.Tab>
        <Tabs.Tab
          value="things to do"
          leftSection={<IconListCheck size={14} />}
        >
          Things To Do
        </Tabs.Tab>
        <Tabs.Tab value="new pueblo" leftSection={<IconPhotoPlus size={14} />}>
          Submit A Pueblo
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Loved_Pueblos">
        <LikedPueblos />
      </Tabs.Panel>

      <Tabs.Panel value="Visited">
        <VisitedPueblos />
      </Tabs.Panel>
      <Tabs.Panel value="things to do">
        <NotFoundOverlay
          title={"Coming soon! Check back later."}
          showButton={false}
        />
      </Tabs.Panel>
      <Tabs.Panel value="new pueblo">
        <NotFoundOverlay
          title={
            "Coming soon! Add your very own pueblo from any part of the world!"
          }
          showButton={false}
        />
      </Tabs.Panel>
    </Tabs>
  );
  // return (
  //   <div className={styles.container}>
  //     <div className={styles.visitedContainer}>
  //       <Title order={2}>Visited</Title>
  //       <ProgressRing valueCount={visited} />
  //     </div>

  //     <LikedPueblos />
  //   </div>
  // );
};

export default ProfileClient;
