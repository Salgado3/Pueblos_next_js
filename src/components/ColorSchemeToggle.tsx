import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import cx from "clsx";
import styles from "./colorSchemeToggle.module.css";

const ColorSchemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={(e) => {
        e.stopPropagation();
        setColorScheme(computedColorScheme === "light" ? "dark" : "light");
      }}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
      className={styles.container}
    >
      <IconSun className={cx(styles.icon, styles.light)} stroke={1.5} />
      <IconMoon className={cx(styles.icon, styles.dark)} stroke={1.5} />
    </ActionIcon>
  );
};

export default ColorSchemeToggle;
