"use client";

import { useActionState, startTransition, useState, useEffect } from "react";
import { User } from "@/types";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formateDateV1 } from "@/lib/utils";
import ChangePassword from "./ChangePassword";
import { Button } from "@/components/ui/button";
import { updateAccountAction } from "@/app/actions/user";
import toast from "react-hot-toast";

function UserInformation({ user }: { user: User }) {
  const [state, action, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      return await updateAccountAction({
        birthday: formData.get("birthday") as string,
        firstname: formData.get("firstname") as string,
        middlename: formData.get("middlename") as string,
        lastname: formData.get("lastname") as string,
      }).then(() => {
        toast.success("User updated.");
      });
    },
    null
  );

  return (
    <div className="px-4">
      <h1 className="font-bold text-2xl">Profile</h1>
      <form action={action} className="py-4 max-w-xl space-y-2">
        <div className="space-y-1">
          <Label>Email</Label>
          <Input placeholder="Email" defaultValue={user.email} readOnly />
        </div>
        <div className="space-y-1">
          <Label htmlFor="firstname">First name</Label>
          <Input
            name="firstname"
            id="firstname"
            placeholder="First name"
            defaultValue={user.firstname}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="middlename">Middle name</Label>
          <Input
            name="middlename"
            id="middlename"
            placeholder="Middle name"
            defaultValue={user.middlename}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="lastname">Last name</Label>
          <Input
            name="lastname"
            id="lastname"
            placeholder="Last name"
            defaultValue={user.lastname}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="birthday">Birthday</Label>
          <Input
            name="birthday"
            id="birthday"
            type="date"
            defaultValue={user.birthday}
          />
        </div>
        <div className="space-y-1">
          <Label>Role</Label>
          <Input defaultValue={user.role} readOnly />
        </div>
        <div className="space-y-1">
          <Label>Email type</Label>
          <Input defaultValue={user.email_type} readOnly />
        </div>
        <div className="space-y-1">
          <Label>Created at</Label>
          <Input defaultValue={formateDateV1(user.createdAt)} readOnly />
        </div>
        <Button disabled={isPending} type="submit" size="sm">
          {isPending && <Loader className="animate-spin" />}
          Update
        </Button>
      </form>
      {user.email_type === "credentials" && <ChangePassword />}
    </div>
  );
}

export default UserInformation;
