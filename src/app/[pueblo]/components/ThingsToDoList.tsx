import usePueblosDetails from "@/lib/reactQuery/usePueblosDetails";
import { List, ThemeIcon } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import LoadingOverlay from "@/components/LoadingOverlay";
import Link from "next/link";

import styles from "./thingsToDoList.module.css";

const ThingsToDoList = ({ puebloId }: { puebloId: string }) => {
  const { data, isLoading, error } = usePueblosDetails([puebloId]);
  if (isLoading) return <LoadingOverlay />;

  if (error) return null;
  if (data?.length === 0) return null;
  const listItems = data?.map((item, i) => {
    if (!item?.title) return;
    return (
      <List.Item key={item.id + i}>
        <Link
          href={item.url_link || "/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p title={item.description || item.title}>{item.title}</p>
        </Link>
      </List.Item>
    );
  });

  return (
    <>
      <h3 className={styles.thingsToDoListTitle}>Things to Do</h3>
      <List
        className={styles.thingsToDoList}
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck size={16} />
          </ThemeIcon>
        }
      >
        {listItems}
      </List>
    </>
  );
};

export default ThingsToDoList;
