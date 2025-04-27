"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DocumentType } from "@/types";
import DocumentTypesAction from "../_components/DocumentTypesAction";
import DocumentStatusEdit from "../_components/DocumentStatusEdit";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<DocumentType>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "name",
    header: "Document Type",
  },
  {
    header: "Status",
    cell: ({ row }) => {
      return <DocumentStatusEdit row={row.original as DocumentType} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DocumentTypesAction row={row.original as DocumentType} />
    ),
  },
];
