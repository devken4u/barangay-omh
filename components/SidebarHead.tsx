"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Barangay174Logo from "./logo/Barangay174Logo";

export function SidebarHead() {
  const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

  return (
    <SidebarMenu>
      <SidebarMenuItem className="hover:bg-gray-200 rounded-md">
        <a href={`${BASE_URL}/`}>
          <div className="flex gap-2">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg p-1">
              <Barangay174Logo />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Barangay 174</span>
              <span className="truncate text-xs">
                Operations and Monitoring Hub
              </span>
            </div>
          </div>
        </a>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
