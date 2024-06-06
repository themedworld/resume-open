import React from "react";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  PowerIcon,PlusIcon,
  ChatBubbleBottomCenterIcon
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
    label: "messager",
    href: "/Messager",
    icon: <ChatBubbleBottomCenterIcon className="w-6 h-6" />,
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
    href: "/fetchresumebyuserid",
    icon: <FolderIcon className="w-6 h-6" />,
  },

  {
    label: "message",
    href: "/Messages",
    icon: < ChatBubbleBottomCenterIcon className="w-6 h-6" />,
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
    label: "messager",
    href: "/Messager",
    icon: < ChatBubbleBottomCenterIcon className="w-6 h-6" />,
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