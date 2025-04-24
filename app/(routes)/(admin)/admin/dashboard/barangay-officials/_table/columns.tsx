"use client";

import { ColumnDef } from "@tanstack/react-table";
import { OfficialPosition } from "@/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<OfficialPosition>[] = [
  {
    accessorKey: "_id",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
