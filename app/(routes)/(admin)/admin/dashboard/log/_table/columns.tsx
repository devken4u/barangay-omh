"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Log } from "@/types";
import { formatDateV2 } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Log>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="p-2">
          <span className="border p-1 rounded-md">{row.original.action}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return formatDateV2(row.original.createdAt);
    },
  },
];
