"use client";

import { Button } from "@/components/ui/button";
import { createAdminAction } from "@/app/actions/user";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { useState } from "react";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";

function AdminCreate() {
  const [state, action, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      return await createAdminAction({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      })
        .then(() => {
          setOpen(false);
          toast.success("Admin account created.");
        })
        .catch(() => {
          setOpen(false);
          toast.error(
            "Admin account creation failed, please check if the email is duplicated"
          );
        });
    },
    null
  );

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        variant="outline"
      >
        Create Admin Account
      </Button>

      <ResponsiveDialog
        title="Create admin account"
        isOpen={open}
        setIsOpen={setOpen}
      >
        <form action={action} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              required
              id="email"
              placeholder="Email"
              name="email"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              minLength={8}
              required
              id="password"
              placeholder="Password"
              name="password"
            />
          </div>
          <div className="flex justify-end">
            <Button disabled={isPending} type="submit">
              {isPending && <Loader className="animate-spin" />}
              Create
            </Button>
          </div>
        </form>
      </ResponsiveDialog>
    </div>
  );
}

export default AdminCreate;
