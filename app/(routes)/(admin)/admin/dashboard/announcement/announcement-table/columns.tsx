"use client";;
import { formatDateV2 } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import AnnouncementActions from "../_components/AnnouncementActions";

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
        <p className="max-w-full min-w-52 text-wrap break-words">
          {row.getValue("description")}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      return <p className="text-wrap break-words max-w-full">{formatDateV2(row.getValue("createdAt"))}</p>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
    cell: ({ row }) => {
      return <p className="text-wrap break-words max-w-full">{formatDateV2(row.getValue("updatedAt"))}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <AnnouncementActions row={row.original as Announcement} />
    ),
  },
];
