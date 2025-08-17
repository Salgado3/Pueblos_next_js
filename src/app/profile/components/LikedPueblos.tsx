"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import Image from "next/image";
import { createClient } from "@/lib/supabase/utils/client";
import { Key } from "react";
import { useQuery } from "@tanstack/react-query";

import styles from "./likedPueblos.module.css";
import { Title } from "@mantine/core";
import Link from "next/link";
import useFetchUserActions from "@/lib/reactQuery/useFetchUserActions";

const LikedPueblos = () => {
  // Use a useQuery hook to manage auth state and get the userId
  const { data: authData, isLoading: authIsLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const userId = authData?.user?.id;

  // Use the new hook to fetch all user actions (liked, visited)
  const {
    data: userActionsData,
    isLoading: userActionsIsLoading,
    error: userActionsError,
  } = useFetchUserActions(userId as string);

  // Filter the actions to get a list of liked pueblo IDs
  const likedPuebloIds =
    userActionsData
      ?.filter((action) => action.action_type === "liked")
      .map((action) => action.pueblo_id) || [];

  // Use a dependent query to fetch only the pueblos that the user has liked
  const {
    data: likedPueblosData,
    isLoading: likedPueblosIsLoading,
    error: likedPueblosError,
  } = useQuery({
    queryKey: ["liked_pueblos", likedPuebloIds],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("pueblos_magicos")
        .select("*")
        .in("id", likedPuebloIds);
      if (error) throw error;
      return data;
    },
    // The query will only run when likedPuebloIds is available and not empty
    enabled: !!likedPuebloIds && likedPuebloIds.length > 0,
  });

  if (authIsLoading || userActionsIsLoading || likedPueblosIsLoading) {
    return <LoadingOverlay />;
  }

  if (likedPueblosError || userActionsError) {
    return <p>An error occurred while fetching your pueblos.</p>;
  }

  if (!likedPueblosData || likedPueblosData.length === 0) {
    return <p>The Pueblos you love will display here..</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Title order={2} className={styles.title}>
          Pueblos I Love
        </Title>
        <Image
          className={styles.titleContainerImg}
          src="/axolotlLove.png"
          alt="axolotl holding a heart"
          width={30}
          height={35}
          aria-hidden
        />
      </div>
      <ul className={styles.unorderedListContainer}>
        {likedPueblosData.map((item: any) => {
          return (
            <li
              key={item.id}
              className={styles.listContainer}
              title={item.title}
            >
              <Link
                className={styles.cardContainerLink}
                href={`/${item.title.toLowerCase().replace(/\s+/g, "_")}`}
                rel="noopener noreferrer"
              >
                <CloudinaryImage
                  puebloTitle={item.title}
                  publicId={item.cloudinary_id}
                  className={styles.image}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LikedPueblos;
