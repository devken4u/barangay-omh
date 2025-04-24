"use client";

import { ColumnDef } from "@tanstack/react-table";
import { OfficialPosition } from "@/types";
import ChangePositionOrder from "../_components/ChangePositionOrder";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<OfficialPosition>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "title",
    header: "Position Title",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <ChangePositionOrder
          officialPosition={row.original as OfficialPosition}
        />
      );
    },
  },
];
