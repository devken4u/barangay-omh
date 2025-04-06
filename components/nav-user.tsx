"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CircleUserRound,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useSession } from "next-auth/react";
import { signOutAccount } from "@/app/actions/auth";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: session, status } = useSession();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {status === "authenticated" && (
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex items-center gap-2">
                  <CircleUserRound className="size-8 shrink-0" />
                  <div className="grid grid-cols-1">
                    <span className="font-semibold truncate">
                      {session?.user.email}
                    </span>
                    <span>{session?.user.role}</span>
                  </div>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
          )}
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2">
                <CircleUserRound className="size-8" />
                <div className="grid grid-cols-1">
                  <span className="font-semibold truncate">
                    {session?.user.email}
                  </span>
                  <span>{session?.user.role}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form action={signOutAccount} className="size-full">
                <button className="flex gap-2 items-center font-bold size-full cursor-pointer">
                  <LogOut className="text-foreground" />
                  Log out
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
