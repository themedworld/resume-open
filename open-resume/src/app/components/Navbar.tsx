"use client"
import React, { useState, useEffect } from "react";
import { Bars3Icon,BarsArrowUpIcon,XCircleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { authService } from "./form/authService";
import { useRouter } from "next/router";
import Layout from "./layout";

export const useClient = true;
const Navbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [showLayout, setShowLayout] = useState(true);
  const toggleLayout = () => {
    setShowLayout((prev) => !prev);
  };

  const VerticalBarsIcon = (props:any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-bars-3 ${props.className}`}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <line x1="5" y1="3" x2="5" y2="21" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="19" y1="3" x2="19" y2="21" />
    </svg>
  );
  

  const [username, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  useEffect(() => {
    const role = authService.getUserRole();
    setUserRole(role);

    const username = authService.getUserName();
    setUserName(username);
    const userId = authService.getUserId();
    setUserId(userId);
  }, []);

  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-100">
      <div className="bg-white shadow-sm z-10">
        <nav
          className={classNames({
            "bg-white text-zinc-500": true,
            "flex items-center": true,
            "w-full fixed z-10 px-4 shadow-sm h-16": true,
          })}
        >
          <div className="font-bold text-lg"><div>
          <button onClick={toggleLayout}>
              {showLayout ? (
                <Bars3Icon style={{ color: 'blue' }} className="w-6 h-6"></Bars3Icon>
                
               
              ) : ( <VerticalBarsIcon  style={{ color: 'blue' }} className="w-6 h-6"></VerticalBarsIcon>
                
              )}
            </button>


          </div></div>
          <div className="flex-grow"></div>
          {userId}
        </nav>
      </div>
      {showLayout ? (
        <Layout>
          <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12">
            {children}
          </main>
        </Layout>
      ) : (
        <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12">
          {children}
        </main>
      )}
    </div>
  );
};

export default Navbar;