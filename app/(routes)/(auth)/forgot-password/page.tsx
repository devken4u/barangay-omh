"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { isEmailValidToResetPasswordAction } from "@/app/actions/user";
import { Loader } from "lucide-react";
import Link from "next/link";
import Barangay174Logo from "@/components/logo/Barangay174Logo";
import { redirect } from "next/navigation";

export default function page() {
  const [state, action, isPending] = useActionState(
    isEmailValidToResetPasswordAction,
    null
  );

  if (state?.status === "success") {
    redirect(`/forgot-password/${state.email}`);
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-orange-200 p-4">
      <div className="bg-white my-auto flex flex-col items-center rounded-md shadow-md gap-2 p-8">
        <Barangay174Logo size={80} />
        <h1 className="font-semibold text-2xl text-center">Forgot Password</h1>
        <h2 className="text-center">
          Enter your email to reset your password.
        </h2>
        <form action={action} className="w-full space-y-2">
          {state?.status === "failed" && (
            <span className="text-destructive text-sm">
              {state.error.message}
            </span>
          )}
          <Input
            autoComplete="off"
            defaultValue={state?.email}
            name="email"
            placeholder="Enter your email"
            type="email"
            required
          />
          <Button disabled={isPending} className="w-full">
            {isPending && <Loader className="animate-spin" />}
            Reset
          </Button>
        </form>
        <Link className="underline" href="/login">
          Back To Login
        </Link>
      </div>
    </div>
  );
}
