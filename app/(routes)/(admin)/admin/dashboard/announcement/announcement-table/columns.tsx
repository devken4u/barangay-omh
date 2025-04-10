"use client";

import { formatDateV2 } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

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
    meta: {
      style: {
        backgroundColor: "red",
      },
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <textarea
          defaultValue={row.getValue("description")}
          className="w-full resize-none"
          readOnly
          rows={3}
        ></textarea>
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
];
