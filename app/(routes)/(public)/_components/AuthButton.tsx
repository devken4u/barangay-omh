import { CircleUserRound } from "lucide-react";
import React from "react";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";

async function AuthButton() {
  const session = await auth();

  const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

  return (
    <div>
      {!session ? (
        <a
          href={`${BASE_URL}/login`}
          className="bg-background text-primary px-4 py-2 rounded-full font-semibold flex gap-2 items-center active:scale-95 shadow-md"
        >
          <CircleUserRound />
          LOGIN
        </a>
      ) : (
        <UserMenu />
      )}
    </div>
  );
}

export default AuthButton;
