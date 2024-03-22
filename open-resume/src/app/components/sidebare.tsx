
import React, { useRef } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { authService } from "./form/authService";
import { defaultNavItems, demandeurNavItems, recriteurNavItems } from "./defaultNavItems";
import { useOnClickOutside } from "usehooks-ts";
import { useState } from "react";
import { useRouter } from "next/navigation";
export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type Props = {
  open: boolean;
  setOpen(open: boolean): void;
};

const Sidebar = ({ open, setOpen }: Props) => {
  const router = useRouter();

  const logout = () => {
    authService.logOut();
    router.push("/SignIn");
  };

  const ref = useRef<HTMLDivElement>(null);
  const [username, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = authService.getUserRole();
    setUserRole(role);

    const username = authService.getUserName();
    setUserName(username);
  }, []);

  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });

  const navItemsToDisplay =
    userRole === "demandeur" ? demandeurNavItems : userRole === "recriteur" ? recriteurNavItems : defaultNavItems;

  return (
    <div
      className={classNames({
        "flex flex-col justify-between": true,
        "bg-indigo-700 text-zinc-50": true,
        "md:w-full md:sticky md:top-16 md:z-0 top-0 z-20 fixed": true,
        "md:h-[calc(100vh_-_64px)] h-full w-[300px]": true,
        "transition-transform .3s ease-in-out md:-translate-x-0": true,
        "-translate-x-full ": !open,
      })}
      ref={ref}
    >
      <nav className="md:sticky top-0 md:top-16">
        {/* nav items */}
        <ul className="py-2 flex flex-col gap-2">
          {navItemsToDisplay.map((item, index) => {
            return (
              <Link key={index} href={item.href}>
                <li
                  className={classNames({
                    "text-indigo-100 hover:bg-indigo-900": true,
                    "flex gap-4 items-center ": true,
                    "transition-colors duration-300": true,
                    "rounded-md p-2 mx-2": true,
                  })}
                  onClick={() => {
                    if (item.href === "/SignIn") {
                      logout();
                    }
                  }}
                >
                  {item.icon} {item.label}
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
      {/* account  */}
      <div className="border-t border-t-indigo-800 p-4">
        <div className="flex gap-4 items-center">
          {username && (
            <div className="flex flex-col ">
              <span className="text-indigo-50 my-0">{username}</span>
              <Link href="/" className="text-indigo-200 text-sm">
                View Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
);
};

export default Sidebar;