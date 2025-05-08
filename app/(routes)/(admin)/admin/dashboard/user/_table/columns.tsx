"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types";
import { formateDateV1 } from "@/lib/utils";
import UserAction from "../_components/UserActions";
import VerifiedStatus from "../_components/VerifiedStatus";

export const columns: ColumnDef<User>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "email_type",
    header: "Email type",
  },
  {
    accessorKey: "is_verified",
    header: "Verified",
    cell: ({ row }) => {
      return <VerifiedStatus row={row.original as User} />;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      if (
        row.original.role === "admin" ||
        row.original.role === "super-admin"
      ) {
        return <span className="font-semibold">{row.original.role}</span>;
      }
      return <span>{row.original.role}</span>;
    },
  },
  {
    accessorKey: "firstname",
    header: "Firstname",
  },
  {
    accessorKey: "middlename",
    header: "Middlename",
  },
  {
    accessorKey: "lastname",
    header: "Lastname",
  },
  {
    accessorKey: "birthday",
    header: "Birthday",
    cell: ({ row }) => {
      return formateDateV1(row.original.birthday);
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      return formateDateV1(row.original.createdAt);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <UserAction row={row.original as User} />,
  },
];
