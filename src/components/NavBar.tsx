"use client";

import Link from "next/link";
import { Button, NavLink } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import {
  IconMap2,
  IconLayoutGrid,
  IconListDetails,
  IconSettingsShare,
  IconLogout2,
  IconUserCircle,
  IconView360,
  IconFilterPin,
} from "@tabler/icons-react";

import { MouseEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/utils/client";
import styles from "./navbar.module.css";
import ColorSchemeToggle from "./ColorSchemeToggle";
import Image from "next/image";
import FilterByStateSearch from "./FilterByStateSearch";
import { FilterByAirportSearch } from "./FilterByAirportSearch";
import { usePueblosContext } from "@/app/context/PueblosContext";
import { useMediaQuery } from "@mantine/hooks";
import BackLink from "./BackLink";

export default function Navbar({ action }: { action: () => void }) {
  const [isDisabled, setIsDisabled] = useState("");
  const [isActive, setInactive] = useState("");
  const { setAirportId, setAirportName, setstateArray, isLoading } =
    usePueblosContext();

  const handleFilterReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setAirportId([]);
    setAirportName([]);
    setstateArray([]);
  };
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const isMobile = useMediaQuery("(max-width: 750px)", true);

  const handleOnClick = ({
    event,
    path,
  }: {
    event: React.MouseEvent<HTMLAnchorElement>;
    path: string;
  }) => {
    event.preventDefault();
    //@ts-expect-error
    setInactive(event.target?.innerText);
    if (path) {
      setIsDisabled(path);
      router.push(path);
    }
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };
  const isUserLoggedIn = pathname === "/login" || pathname === "/signup";
  return (
    <div>
      <BackLink />
      <NavLink
        label="About"
        disabled={isDisabled === "/about"}
        onClick={(e) => handleOnClick({ event: e, path: "/about" })}
        active={isActive === "About"}
        variant="filled"
      />
      <NavLink
        leftSection={<IconUserCircle />}
        label="Profile"
        disabled={isDisabled === "/profile"}
        onClick={(e) => handleOnClick({ event: e, path: "/profile" })}
        active={isActive === "Profile"}
        variant="filled"
      />
      <NavLink leftSection={<IconView360 />} label="Change View">
        <NavLink
          leftSection={<IconMap2 />}
          label="Map"
          disabled={isDisabled === "/map"}
          onClick={(e) => handleOnClick({ event: e, path: "/map" })}
          active={isActive === "Map"}
          variant="filled"
        />
        <NavLink
          leftSection={<IconLayoutGrid />}
          label="Grid"
          disabled={isDisabled === "/grid"}
          onClick={(e) => handleOnClick({ event: e, path: "/grid" })}
          active={isActive === "Grid"}
          variant="filled"
        />
        <NavLink
          leftSection={<IconListDetails />}
          label="List"
          disabled={isDisabled === "/list"}
          onClick={(e) => handleOnClick({ event: e, path: "/list" })}
          active={isActive === "List"}
          variant="filled"
        />
      </NavLink>
      <NavLink leftSection={<IconFilterPin />} label="Add Filters">
        <FilterByAirportSearch />
        <FilterByStateSearch />
        <Button
          className={styles.drawerButton}
          variant="default"
          fullWidth
          onClick={handleFilterReset}
        >
          Reset filters
        </Button>
      </NavLink>
      <NavLink
        leftSection={<IconSettingsShare />}
        label="Settings"
        disabled={isDisabled === "/settings"}
        onClick={(e) => handleOnClick({ event: e, path: "/settings" })}
        active={isActive === "Settings"}
        variant="filled"
      />
      <NavLink
        leftSection={<IconLogout2 />}
        label="Log out"
        onClick={handleLogout}
        color="red"
      />
      {isMobile && (
        <Button
          className={styles.drawerButton}
          variant="default"
          fullWidth
          onClick={action}
        >
          Close Drawer
        </Button>
      )}
    </div>
  );
}
