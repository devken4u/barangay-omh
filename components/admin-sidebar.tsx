"use client";
import * as React from "react";
import { MonitorCog, BookOpenText, House, LucideIcon } from "lucide-react";

import { AdminNavMain } from "@/components/admin-nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarHead } from "./SidebarHead";

const data = {
  content: [
    {
      title: "Homepage",
      url: "#",
      icon: House,
      isActive: true,
      items: [
        {
          title: "Featured Photo",
          url: "/admin/dashboard/featured-photo",
          allowedRole: ["super-admin"],
        },
        {
          title: "Announcement",
          url: "/admin/dashboard/announcement",
          allowedRole: ["super-admin"],
        },
        {
          title: "Hotline",
          url: "/admin/dashboard/hotline",
          allowedRole: ["super-admin"],
        },
        {
          title: "Garbage Schedules",
          url: "/admin/dashboard/garbage-schedules",
          allowedRole: ["super-admin"],
        },
      ],
    },
    {
      title: "Content",
      url: "#",
      icon: BookOpenText,
      isActive: true,
      items: [
        {
          title: "Article",
          url: "/admin/dashboard/article",
          allowedRole: ["admin", "super-admin"],
        },
        {
          title: "Article List",
          url: "/admin/dashboard/articles",
          allowedRole: ["admin", "super-admin"],
        },
      ],
    },
    {
      title: "System",
      url: "#",
      icon: MonitorCog,
      isActive: true,
      items: [
        {
          title: "User",
          url: "/admin/dashboard/user",
          allowedRole: ["super-admin"],
        },
        {
          title: "Log",
          url: "/admin/dashboard/log",
          allowedRole: ["super-admin"],
        },
      ],
    },
  ],
};

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarHead />
      </SidebarHeader>
      <SidebarContent>
        <AdminNavMain
          items={
            data.content as {
              title: string;
              url: string;
              icon?: LucideIcon;
              isActive?: boolean;
              items?: {
                title: string;
                url: string;
                allowedRole: ("user" | "super-admin" | "admin")[];
              }[];
            }[]
          }
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
