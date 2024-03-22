import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useEffect } from "react";
import { authService } from "./form/authService";
import { useState } from "react";
import { useRouter } from "next/navigation";
type Props = {
  onMenuButtonClick(): void;
};
const Navbar = (props: Props) => {
  const [username, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  useEffect(() => {
    const role = authService.getUserRole();
    setUserRole(role);

    const username = authService.getUserName();
    setUserName(username);
  }, []);
  return (
    <nav
      className={classNames({
        "bg-white text-zinc-500": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-10 px-4 shadow-sm h-16": true, //positioning & styling
      })}
    >
      <div className="font-bold text-lg">{userRole}</div>
      <div className="flex-grow"></div> hello {username}
      <button className="md:hidden" onClick={props.onMenuButtonClick}>yhhy
        <Bars3Icon className="h-6 w-6" />
      </button>
    </nav>
  );
};
export default Navbar;