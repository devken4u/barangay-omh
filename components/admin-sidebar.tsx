"use client";
import * as React from "react";
import { MonitorCog, BookOpenText, House } from "lucide-react";

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
        },
        {
          title: "Announcement",
          url: "/admin/dashboard/announcement",
        },
        {
          title: "Hotline",
          url: "/admin/dashboard/hotline",
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
        },
        {
          title: "Log",
          url: "/admin/dashboard/log",
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
        <AdminNavMain items={data.content} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
