import React from "react";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { authService } from "./form/authService";
import { NavItem } from "./sidebare";




export const defaultNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Team",
    href: "/team",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    label: "logout",
    href: "/SignIn",
    icon: <PowerIcon className="w-6 h-6" />,
  },
];

export const demandeurNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/Demandeur",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Builder",
    href: "/createnewresume",
    icon: <BuildingLibraryIcon className="w-6 h-6" />,
  },
  {
    label: "Your resume",
    href: "/fetchresumebyuserid",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    label: "parser",
    href: "/resume-parser",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
  {
    label: "logout",
    href: "/SignIn",
    icon: <PowerIcon className="w-6 h-6" />,
  },
];

export const recriteurNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "#",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Team",
    href: "/Recruteur",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    label: "recriteur",
    href: "/Recruteur",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    label: "logout",
    href: "/SignIn",
    icon: <PowerIcon className="w-6 h-6" />,
  },
];