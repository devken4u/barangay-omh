"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Queue } from "@/types";
import { formatDateV2 } from "@/lib/utils";
import QueueActions from "../_components/QueueActions";

export const columns: ColumnDef<Queue>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "person_name",
    header: "Person name",
  },
  {
    accessorKey: "createdAt",
    header: "Added date",
    cell: ({ row }) => {
      return formatDateV2(row.original.createdAt);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <QueueActions row={row.original} />,
  },
];
