"use client";
import { AppShell, Burger, Title, useComputedColorScheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ColorSchemeToggle from "./ColorSchemeToggle";
import NavBar from "./NavBar";
import BackLink from "./BackLink";

import styles from "./appLayout.module.css";

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery("(max-width: 750px)", true);
  const pathname = usePathname();
  const isUserLoggedIn = pathname !== "/login" && pathname !== "/signup";
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <AppShell
      padding="md"
      header={{ height: isMobile ? 60 : 60 }}
      navbar={{
        width: isUserLoggedIn ? 300 : 0,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header zIndex={1000}>
        <div className={styles.titleContainer}>
          {isUserLoggedIn && (
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              style={{ margin: "1rem" }}
            />
          )}

          <Image
            src={"/axolotlSuitcase.png"}
            alt="axolotl"
            aria-hidden
            width={40}
            height={40}
            className={styles.logoImg}
          />
          <Title order={2} className={styles.logo}>
            Querido Pueblos
          </Title>
          <ColorSchemeToggle />
        </div>
      </AppShell.Header>

      {isUserLoggedIn && (
        <AppShell.Navbar zIndex={1001}>
          <NavBar action={toggle} />
        </AppShell.Navbar>
      )}
      <AppShell.Main>
        <>
          <BackLink />
          {children}
        </>
      </AppShell.Main>
      <AppShell.Footer withBorder></AppShell.Footer>
    </AppShell>
  );
};

export default AppLayout;
