"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateV2 } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil } from "lucide-react";
import AnnouncementDelete from "../_components/AnnouncementDelete";
import AnnouncementEdit from "../_components/AnnoucementEdit";
import { useEffect, useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Announcement = {
  _id: string;
  created_by: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Announcement>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <p className="max-w-full text-wrap break-words">
          {row.getValue("description")}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      return formatDateV2(row.getValue("createdAt"));
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
    cell: ({ row }) => {
      return formatDateV2(row.getValue("updatedAt"));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const announcement = row.original;

      const [isEditOpen, setIsEditOpen] = useState(false);

      useEffect(() => {
        console.log("Dialog open:", isEditOpen);
      }, [isEditOpen]);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsEditOpen(true);
                  }}
                >
                  <Pencil />
                  Edit
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onSelect={(e) => e.preventDefault()}
              >
                <AnnouncementDelete id={announcement._id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AnnouncementEdit
            announcement={announcement}
            open={isEditOpen}
            setIsOpen={setIsEditOpen}
          />
        </>
      );
    },
  },
];
