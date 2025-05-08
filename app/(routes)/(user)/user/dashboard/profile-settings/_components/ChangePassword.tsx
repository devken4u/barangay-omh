"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useState } from "react";
import { updatePasswordAction } from "@/app/actions/user";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

function ChangePassword() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const [state, action, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      const newPassword = formData.get("new-password") as string;
      const confirmPassword = formData.get("new-password") as string;
      if (newPassword !== confirmPassword) {
        setError("New and confirm password is not matched.");
        return false;
      }
      const result = await updatePasswordAction({
        currentPassword: formData.get("current-password") as string,
        newPassword: newPassword,
      });
      if (result === "incorrect-password") {
        setError("Current password incorrect.");
        return false;
      }
      toast.success("Password updated.");
      setError("");
      setIsOpen(false);
      return true;
    },
    null
  );

  return (
    <div>
      <h2 className="font-bold text-lg">Password</h2>
      {error && <span className="text-red-500 text-sm">{error}</span>}
      {!isOpen && (
        <Button
          size="sm"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Change password
        </Button>
      )}
      {isOpen && (
        <form action={action} className="py-2 max-w-xl space-y-2">
          <div className="space-y-1">
            <Label htmlFor="current-password">Current password</Label>
            <Input
              name="current-password"
              id="current-password"
              required
              minLength={8}
              placeholder="Current password"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new-password">New password</Label>
            <Input
              id="new-password"
              name="new-password"
              required
              minLength={8}
              placeholder="New password"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirm-password">Confirm password</Label>
            <Input
              id="confirm-password"
              name="confirm-password"
              required
              minLength={8}
              placeholder="Confirm password"
            />
          </div>
          <div className="space-x-2">
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button disabled={isPending} size="sm" type="submit">
              {isPending && <Loader className="animate-spin" />}
              Change
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ChangePassword;
