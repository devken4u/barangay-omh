import { CircleUserRound, LogOut, SquareUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutAccount } from "@/app/actions/auth";
import { auth } from "@/auth";

async function UserMenu() {
  const session = await auth();

  const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

  const dashboardLink =
    session?.user.role === "user" ? "/user/dashboard" : "/admin/dashboard";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer bg-background text-primary rounded-full size-8 flex items-center justify-center">
          <CircleUserRound className="size-8" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <CircleUserRound className="size-10" />
            <div className="grid grid-cols-1">
              <span className="font-semibold">{session?.user.email}</span>
              <span>{session?.user.role}</span>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <a
            target="_blank"
            href={BASE_URL + dashboardLink}
            className="flex gap-2 items-center font-bold size-full cursor-pointer"
          >
            <SquareUserRound className="text-foreground" />
            Dashboard
          </a>
        </DropdownMenuItem>

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
  );
}

export default UserMenu;
