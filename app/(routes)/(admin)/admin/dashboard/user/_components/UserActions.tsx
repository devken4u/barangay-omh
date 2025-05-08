import IconMenu from "@/components/IconMenu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
// import { Announcement } from "../announcement-table/columns";
// import AnnouncementEdit from "./AnnoucementEdit";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { User } from "@/types";

function UserAction({ row }: { row: User }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [iEditOpen, setIEditOpen] = useState(false);

  return (
    <>
      {/* <ResponsiveDialog
        isOpen={iEditOpen}
        setIsOpen={setIEditOpen}
        title={"Edit Announcement"}
      >
        <AnnouncementEdit announcement={row} setIsOpen={setIEditOpen} />
      </ResponsiveDialog>

      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title={"Delete Announcement?"}
      >
        <AnnouncementDelete id={row._id} setIsOpen={setIsDeleteOpen} />
      </ResponsiveDialog> */}

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
                setIEditOpen(true);
              }}
              className="w-full justify-start flex hover:cursor-pointer"
            >
              <IconMenu text="Edit" icon={<SquarePen className="h-4 w-4" />} />
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <button
              onClick={() => {
                setIsDeleteOpen(true);
              }}
              className="w-full justify-start flex hover:cursor-pointer"
            >
              <IconMenu
                text="Delete"
                icon={<Trash2 className="h-4 w-4 text-destructive" />}
              />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default UserAction;
