"use client";

import { ColumnDef } from "@tanstack/react-table";
import { VerifiedDocument } from "@/types";
import { formatDateV2 } from "@/lib/utils";
import DownloadVerifiedDocumentQrCode from "../_components/DownloadVerifiedDocumentQrCode";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<VerifiedDocument>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "owner_name",
    header: "Owner",
  },
  {
    accessorKey: "document_type",
    header: "Document type",
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
  {
    accessorKey: "verified_by",
    header: "Verified by",
  },
  {
    accessorKey: "createdAt",
    header: "Verified at",
    cell: ({ row }) => {
      return (
        <p className="text-wrap break-words max-w-full">
          {formatDateV2(row.getValue("createdAt"))}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DownloadVerifiedDocumentQrCode row={row.original as VerifiedDocument} />
    ),
  },
];
