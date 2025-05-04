"use client";
import { cn } from "@/lib/utils";
import {
  Megaphone,
  Phone,
  SquareMenu,
  Home,
  NotebookText,
  Users,
  Newspaper,
} from "lucide-react";
import { useState } from "react";
import { NavigationGroupLink } from "../_types/types";
import { v4 as uuidv4 } from "uuid";
import NavigationGroupLinkComponent from "./NavigationGroupLinkComponent";

export default function NavigationLinks() {
  const [isNavigationLinksOpen, setIsNavigationLinksOpen] = useState(false);

  const navigationGroupLinks: NavigationGroupLink = {
    groupName: "Links",
    links: [
      { name: "Home", url: "/", key: uuidv4(), icon: Home },
      {
        name: "Announcements",
        url: "/announcements",
        key: uuidv4(),
        icon: Megaphone,
      },
      { name: "About", url: "/about", key: uuidv4(), icon: NotebookText },
      { name: "Article", url: "/article", key: uuidv4(), icon: Newspaper },
      {
        name: "Barangay Officials",
        url: "/barangay-officials",
        key: uuidv4(),
        icon: Users,
      },
      {
        name: "Hotlines",
        url: "/hotlines",
        key: uuidv4(),
        icon: Phone,
      },
    ],
  };

  const navigationGroupServices: NavigationGroupLink = {
    groupName: "Services",
    links: [
      { name: "Job Board", url: "/job-board", key: uuidv4(), icon: Home },
    ],
  };

  return (
    <div>
      <button
        onClick={() => setIsNavigationLinksOpen((prev) => !prev)}
        className="hover:bg-background hover:text-primary cursor-pointer bg-transparent text-background rounded-full size-8 flex items-center justify-center"
      >
        <SquareMenu className="size-6" />
      </button>
      <div
        className={cn(
          "absolute z-50 top-full left-0 w-full bg-primary overflow-hidden transition-[max-height] px-8 rounded-b-md text-background",
          isNavigationLinksOpen ? "max-h-[5000px]" : "max-h-0"
        )}
      >
        <NavigationGroupLinkComponent
          navigationGroupLink={navigationGroupLinks}
        />
        <NavigationGroupLinkComponent
          navigationGroupLink={navigationGroupServices}
        />
      </div>
    </div>
  );
}
