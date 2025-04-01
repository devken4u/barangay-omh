import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";

async function AuthButton() {
  const session = await auth();

  return (
    <div>
      {!session ? (
        <Link
          href="/login"
          className="bg-background text-primary px-4 py-2 rounded-full font-semibold flex gap-2 items-center active:scale-95 shadow-md"
        >
          <CircleUserRound />
          LOGIN
        </Link>
      ) : (
        <UserMenu />
      )}
    </div>
  );
}

export default AuthButton;
