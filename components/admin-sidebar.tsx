"use client";
import * as React from "react";
import {
  MonitorCog,
  BookOpenText,
  House,
  LucideIcon,
  File,
  ChartColumnIncreasing,
  User,
} from "lucide-react";

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
        // {
        //   title: "Featured Photo",
        //   url: "/admin/dashboard/featured-photo",
        //   allowedRole: ["super-admin"],
        // },
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
        {
          title: "Barangay Officials",
          url: "/admin/dashboard/barangay-officials",
          allowedRole: ["super-admin"],
        },
        {
          title: "Calendar",
          url: "/admin/dashboard/calendar",
          allowedRole: ["super-admin"],
        },
      ],
    },
    {
      title: "Document",
      url: "#",
      icon: File,
      isActive: true,
      items: [
        {
          title: "Document Types",
          url: "/admin/dashboard/document-types",
          allowedRole: ["super-admin"],
        },
        {
          title: "Verify Document",
          url: "/admin/dashboard/verify-documents",
          allowedRole: ["admin", "super-admin"],
        },
      ],
    },
    {
      title: "Services",
      url: "#",
      icon: ChartColumnIncreasing,
      isActive: true,
      items: [
        {
          title: "Job Posting Requests",
          url: "/admin/dashboard/job-posting-request",
          allowedRole: ["super-admin", "admin"],
        },
        {
          title: "Online queuing",
          url: "/admin/dashboard/online-queuing",
          allowedRole: ["super-admin", "admin"],
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
        {
          title: "Preferences",
          url: "/admin/dashboard/preferences",
          allowedRole: ["super-admin"],
        },
      ],
    },
    {
      title: "Profile",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Settings",
          url: "/admin/dashboard/profile-settings",
          allowedRole: ["super-admin", "admin"],
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
