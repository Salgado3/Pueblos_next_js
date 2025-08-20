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
  const [isActive, setIsActive] = useState("");
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
    if (isActive !== pathname) {
      setIsActive(pathname);
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
    const newPath = `/${event.target?.innerText.toLowerCase()}`;

    if (isActive === newPath) {
      return;
    }

    setIsActive(newPath);
    if (path) {
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

  return (
    <div>
      <NavLink
        styles={{
          label: {
            fontSize: "1rem",
            fontWeight: "600",
          },
        }}
        leftSection={<IconUserCircle />}
        label="Profile"
        onClick={(e) => handleOnClick({ event: e, path: "/profile" })}
        active={isActive === "/profile"}
        variant="filled"
      />
      <NavLink
        styles={{
          label: { fontSize: "1rem", fontWeight: "600" },
        }}
        leftSection={<IconView360 />}
        label="Change View"
      >
        <NavLink
          styles={{
            label: { fontSize: "1rem", fontWeight: "400" },
          }}
          leftSection={<IconMap2 />}
          label="Map"
          onClick={(e) => handleOnClick({ event: e, path: "/map" })}
          active={isActive === "/map"}
          variant="filled"
        />
        <NavLink
          styles={{
            label: { fontSize: "1rem", fontWeight: "400" },
          }}
          leftSection={<IconLayoutGrid />}
          label="Grid"
          onClick={(e) => handleOnClick({ event: e, path: "/grid" })}
          active={isActive === "/grid"}
          variant="filled"
        />
        <NavLink
          styles={{
            label: { fontSize: "1rem", fontWeight: "400" },
          }}
          leftSection={<IconListDetails />}
          label="List"
          onClick={(e) => handleOnClick({ event: e, path: "/list" })}
          active={isActive === "/list"}
          variant="filled"
        />
      </NavLink>
      <NavLink
        styles={{
          label: { fontSize: "1rem", fontWeight: "600" },
        }}
        leftSection={<IconFilterPin />}
        label="Add Filters"
      >
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
        styles={{
          label: { fontSize: "1rem", fontWeight: "600" },
        }}
        leftSection={<IconSettingsShare />}
        label="Settings"
        onClick={(e) => handleOnClick({ event: e, path: "/settings" })}
        active={isActive === "/settings"}
        variant="filled"
      />
      <NavLink
        styles={{
          label: { fontSize: "1rem", fontWeight: "600" },
        }}
        leftSection={<IconAdjustmentsAlt />}
        label="About"
        onClick={(e) => handleOnClick({ event: e, path: "/about" })}
        active={isActive === "/about"}
        variant="filled"
      />
      <NavLink
        styles={{
          label: { fontSize: "1rem", fontWeight: "600" },
        }}
        leftSection={<IconLogout2 />}
        label="Log out"
        onClick={handleLogout}
        style={{ marginTop: "3rem" }}
      />
    </div>
  );
}
