"use client";
import * as React from "react";
import { BookOpenText, LucideIcon } from "lucide-react";

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
      title: "Content",
      url: "#",
      icon: BookOpenText,
      isActive: true,
      items: [
        {
          title: "Job Board",
          url: "/user/dashboard/job-board",
          allowedRole: ["user"],
        },
      ],
    },
  ],
};

export function UserSidebar({
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
