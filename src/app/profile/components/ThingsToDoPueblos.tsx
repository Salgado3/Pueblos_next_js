import useFetchUserActions from "@/lib/reactQuery/useFetchUserActions";
import usePueblosDetails from "@/lib/reactQuery/usePueblosDetails";
import { createClient } from "@/lib/supabase/utils/client";
import { List, LoadingOverlay, ThemeIcon } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import styles from "./thingsToDoPueblos.module.css";
import React from "react";

const ThingsToDoPueblos = () => {
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

  const {
    data: userActionsData,
    isLoading: userActionsIsLoading,
    error: userActionsError,
  } = useFetchUserActions(userId as string);
  const puebloIds = userActionsData?.map((item) => item.pueblo_id) || [];
  const { data, isLoading, error } = usePueblosDetails(puebloIds);

  if (authIsLoading || userActionsIsLoading || isLoading) {
    return <LoadingOverlay />;
  }

  if (
    error ||
    userActionsError ||
    typeof userActionsData !== "object" ||
    typeof data !== "object"
  ) {
    return <p>An error occurred while fetching your pueblos.</p>;
  }
  const puebloTitleTracker: { [key: string]: boolean } = {};
  const listItems = data?.map((item, i) => {
    const puebloTitle = item.pueblos_magicos.title || "";
    if (!item?.title && !puebloTitle) return;
    let renderPuebloTitle = false;
    if (puebloTitle && !puebloTitleTracker[puebloTitle]) {
      puebloTitleTracker[puebloTitle] = true;
      renderPuebloTitle = true;
    }
    return (
      <React.Fragment key={item.id + i + "list"}>
        {renderPuebloTitle && <h3 className={styles.title}>{puebloTitle}</h3>}
        <List
          className={styles.list}
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size={16} />
            </ThemeIcon>
          }
        >
          <List.Item
            key={item.id + i + puebloTitle}
            className={styles.listItem}
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <IconCircleCheck size={16} />
              </ThemeIcon>
            }
          >
            <Link
              href={item.url_link || "/"}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id + item.url_link}
            >
              <p title={item.description || item.title || puebloTitle}>
                {item.title}
              </p>
            </Link>
          </List.Item>
        </List>
      </React.Fragment>
    );
  });

  return listItems;
};

export default ThingsToDoPueblos;
