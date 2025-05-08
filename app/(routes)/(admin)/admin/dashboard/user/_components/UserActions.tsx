import IconMenu from "@/components/IconMenu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, SquarePen, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { User } from "@/types";
import ResetPassword from "./ResetPassword";

function UserAction({ row }: { row: User }) {
  const [isResetOpen, setIsResetOpen] = useState(false);

  return (
    <>
      <ResponsiveDialog
        isOpen={isResetOpen}
        setIsOpen={setIsResetOpen}
        title={"Reset Password?"}
      >
        <ResetPassword user={row} setIsOpen={setIsResetOpen} />
      </ResponsiveDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36" align="end">
          <DropdownMenuItem>
            <button
              onClick={() => {
                setIsResetOpen(true);
              }}
              className="w-full justify-start flex hover:cursor-pointer"
            >
              <IconMenu
                text="Reset"
                icon={<LockKeyhole className="h-4 w-4" />}
              />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default UserAction;
