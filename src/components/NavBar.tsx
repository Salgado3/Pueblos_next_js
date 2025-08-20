"use client";

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
  IconAdjustmentsAlt,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/utils/client";
import FilterByStateSearch from "./FilterByStateSearch";
import { FilterByAirportSearch } from "./FilterByAirportSearch";
import { usePueblosContext } from "@/app/context/PueblosContext";
import { useMediaQuery } from "@mantine/hooks";

import styles from "./navbar.module.css";

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

  useEffect(() => {
    if (isDisabled !== pathname) {
      setIsDisabled(pathname);
      setInactive(pathname);
    }
  }, [pathname]);
  const handleOnClick = ({
    event,
    path,
  }: {
    event: React.MouseEvent<HTMLAnchorElement>;
    path: string;
  }) => {
    event.preventDefault();
    //@ts-expect-error
    setInactive(`/${event.target?.innerText.toLowerCase()}`);
    if (path) {
      setIsDisabled(path);
      router.push(path);
      {
        isMobile &&
          setTimeout(() => {
            action();
          }, 1000);
      }
    }
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };
  const isUserLoggedIn = pathname === "/login" || pathname === "/signup";
  return (
    <div>
      <NavLink
        leftSection={<IconUserCircle />}
        label="Profile"
        disabled={isDisabled === "/profile"}
        onClick={(e) => handleOnClick({ event: e, path: "/profile" })}
        active={isActive === "/profile"}
        variant="filled"
      />
      <NavLink leftSection={<IconView360 />} label="Change View">
        <NavLink
          leftSection={<IconMap2 />}
          label="Map"
          disabled={isDisabled === "/map"}
          onClick={(e) => handleOnClick({ event: e, path: "/map" })}
          active={isActive === "/map"}
          variant="filled"
        />
        <NavLink
          leftSection={<IconLayoutGrid />}
          label="Grid"
          disabled={isDisabled === "/grid"}
          onClick={(e) => handleOnClick({ event: e, path: "/grid" })}
          active={isActive === "/grid"}
          variant="filled"
        />
        <NavLink
          leftSection={<IconListDetails />}
          label="List"
          disabled={isDisabled === "/list"}
          onClick={(e) => handleOnClick({ event: e, path: "/list" })}
          active={isActive === "/list"}
          variant="filled"
        />
      </NavLink>
      <NavLink leftSection={<IconFilterPin />} label="Add Filters">
        <FilterByAirportSearch />
        <FilterByStateSearch />
        <Button
          className={styles.drawerButton}
          variant="default"
          onClick={handleFilterReset}
        >
          Reset filters
        </Button>
        {isMobile && (
          <Button
            className={styles.drawerButton}
            variant="default"
            onClick={action}
          >
            Close Drawer
          </Button>
        )}
      </NavLink>
      <NavLink
        leftSection={<IconSettingsShare />}
        label="Settings"
        disabled={isDisabled === "/settings"}
        onClick={(e) => handleOnClick({ event: e, path: "/settings" })}
        active={isActive === "/settings"}
        variant="filled"
      />
      <NavLink
        leftSection={<IconAdjustmentsAlt />}
        label="About"
        disabled={isDisabled === "/about"}
        onClick={(e) => handleOnClick({ event: e, path: "/about" })}
        active={isActive === "/about"}
        variant="filled"
      />
      <NavLink
        leftSection={<IconLogout2 />}
        label="Log out"
        onClick={handleLogout}
        style={{ marginTop: "3rem" }}
      />
    </div>
  );
}
