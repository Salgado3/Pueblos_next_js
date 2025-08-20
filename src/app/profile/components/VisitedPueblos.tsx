"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import Image from "next/image";
import { createClient } from "@/lib/supabase/utils/client";
import { useQuery } from "@tanstack/react-query";

import styles from "./visitedPueblos.module.css";
import { Title } from "@mantine/core";
import Link from "next/link";
import useFetchUserActions from "@/lib/reactQuery/useFetchUserActions";

const VisitedPueblos = () => {
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
  const visitedPueblosId =
    userActionsData
      ?.filter((action) => action.action_type === "visited")
      .map((action) => action.pueblo_id) || [];

  // Use a dependent query to fetch only the pueblos that the user has liked
  const {
    data: visitedPueblosData,
    isLoading: visitedPueblosIsLoading,
    error: visitedPueblosError,
  } = useQuery({
    queryKey: ["visited_pueblos", visitedPueblosId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("pueblos_magicos")
        .select("*")
        .in("id", visitedPueblosId);
      if (error) throw error;
      return data;
    },
    // The query will only run when visitedPueblosId is available and not empty
    enabled: !!visitedPueblosId && visitedPueblosId.length > 0,
  });

  if (authIsLoading || userActionsIsLoading || visitedPueblosIsLoading) {
    return <LoadingOverlay />;
  }

  if (visitedPueblosError || userActionsError) {
    return <p>An error occurred while fetching your pueblos.</p>;
  }

  if (!visitedPueblosData || visitedPueblosData.length === 0) {
    return <p>The Pueblos you love will display here..</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Title order={2} className={styles.title}>
          Visited Pueblos
        </Title>
        <Image
          className={styles.titleContainerImg}
          src="/axolotlSuitcase.png"
          alt="axolotl holding a heart"
          width={30}
          height={35}
          aria-hidden
        />
      </div>
      <ul className={styles.unorderedListContainer}>
        {visitedPueblosData.map((item: any) => {
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

export default VisitedPueblos;
