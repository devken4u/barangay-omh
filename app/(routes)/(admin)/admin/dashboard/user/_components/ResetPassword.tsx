import { User } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  startTransition,
} from "react";
import { resetUserPasswordByAdminAction } from "@/app/actions/user";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

function ResetPassword({
  user,
  setIsOpen,
}: {
  user: User;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [state, action, isPending] = useActionState(async () => {
    return await resetUserPasswordByAdminAction(
      user.email,
      "admin-password"
    ).then(() => {
      setIsOpen(false);
      toast.success("Password reset.");
    });
  }, null);

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        onClick={() => {
          setIsOpen(false);
        }}
        variant="destructive"
      >
        Cancel
      </Button>
      <Button
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            action();
          });
        }}
      >
        {isPending && <Loader className="animate-spin" />}
        Reset
      </Button>
    </div>
  );
}

export default ResetPassword;
