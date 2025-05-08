"use client";

import { useActionState, startTransition, useState, useEffect } from "react";
import { getLoggedUserAction } from "@/app/actions/user";
import { User } from "@/types";
import { Loader } from "lucide-react";

function UserInformation() {
  const [state, action, isPending] = useActionState(async () => {
    const user = await getLoggedUserAction();
    return user;
  }, null);

  useEffect(() => {
    startTransition(() => {
      action();
    });
  }, []);

  return (
    <div className="px-4">
      {isPending && <Loader className="animate-spin" />}
      <div> </div>
    </div>
  );
}

export default UserInformation;
