"use client";

import { NavLink } from "@mantine/core";
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
import { useMediaQuery } from "@mantine/hooks";

export default function Navbar({ action }: { action: () => void }) {
  const [isActive, setIsActive] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const isMobile = useMediaQuery("(max-width: 750px)", true);

  useEffect(() => {
    if (isActive !== pathname) {
      setIsActive(pathname);
    }
  }, [pathname, isActive]);
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
        label="Find Pueblos"
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
        leftSection={<IconLogout2 />}
        label="Log out"
        onClick={handleLogout}
        style={{ marginTop: "2rem" }}
      />
    </div>
  );
}
