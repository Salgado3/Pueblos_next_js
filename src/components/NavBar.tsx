import { signOut } from "@/app/login/actions";
import Link from "next/link";
import React from "react";
//TODO set logout only when logged in
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
        <form action={signOut}>
          <button
            type="submit"
            className="text-sm text-gray-500 hover:text-black"
          >
            Log out
          </button>
        </form>
      </ul>
    </nav>
  );
};

export default NavBar;
