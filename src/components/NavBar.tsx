import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href={"/"}>Back Home</Link>
        </li>
        <li>
          <Link href={"/about"}>about</Link>
        </li>
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
