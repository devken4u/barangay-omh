import React, { useState } from "react";
import { DocumentType } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import IconMenu from "@/components/IconMenu";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import DocumentTypeEdit from "./DocumentTypeEdit";

function DocumentTypesAction({ row }: { row: DocumentType }) {
  const [iEditOpen, setIEditOpen] = useState(false);

  return (
    <div>
      <ResponsiveDialog
        isOpen={iEditOpen}
        setIsOpen={setIEditOpen}
        title={"Edit Document Type"}
      >
        <DocumentTypeEdit setIsOpen={setIEditOpen} documentType={row} />
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
                setIEditOpen(true);
              }}
              className="w-full justify-start flex hover:cursor-pointer"
            >
              <IconMenu text="Edit" icon={<SquarePen className="h-4 w-4" />} />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DocumentTypesAction;
