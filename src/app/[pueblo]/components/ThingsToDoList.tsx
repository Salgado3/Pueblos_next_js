import usePuebloDetails from "@/lib/reactQuery/usePuebloDetails";
import { List, ThemeIcon } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";

import styles from "./thingsToDoList.module.css";
import LoadingOverlay from "@/components/LoadingOverlay";
import Link from "next/link";

const ThingsToDoList = ({ puebloId }: { puebloId: string }) => {
  const { data, isLoading, error } = usePuebloDetails(puebloId);
  if (isLoading) return <LoadingOverlay />;

  if (error) return null;
  if (data?.length === 0) return null;
  const listItems = data?.map((item, i) => {
    if (!item?.title) return;
    return (
      <List.Item key={item.id}>
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

  console.log("Jaimes data", data, puebloId);
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
