"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FormEvent,
  useActionState,
  useState,
  startTransition,
  useEffect,
} from "react";
import { RegisterSchema } from "@/lib/zod";
import { RegisterType } from "@/lib/zod";
import { registerUserAction } from "@/app/actions/user";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
  const [errors, setErrors] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    birthday: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [state, action, isPending] = useActionState(registerUserAction, null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const user: RegisterType = {
      firstname: (formData.get("firstname") as string) ?? "",
      middlename: (formData.get("middlename") as string) ?? "",
      lastname: (formData.get("lastname") as string) ?? "",
      birthday: new Date(formData.get("birthday") as string) ?? "",
      email: (formData.get("email") as string) ?? "",
      password: (formData.get("password") as string) ?? "",
      confirmPassword: (formData.get("confirmPassword") as string) ?? "",
    };

    const result = RegisterSchema.safeParse(user);

    if (result.error) {
      setErrors(() => {
        return {
          firstname: result.error.format().firstname?._errors[0] ?? "",
          middlename: result.error.format().middlename?._errors[0] ?? "",
          lastname: result.error.format().lastname?._errors[0] ?? "",
          birthday: result.error.format().birthday?._errors[0] ?? "",
          email: result.error.format().email?._errors[0] ?? "",
          password: result.error.format().password?._errors[0] ?? "",
          confirmPassword:
            result.error.format().confirmPassword?._errors[0] ?? "",
        };
      });
    } else {
      setErrors(() => {
        return {
          firstname: "",
          middlename: "",
          lastname: "",
          birthday: "",
          email: "",
          password: "",
          confirmPassword: "",
        };
      });

      startTransition(() => {
        action(formData);
      });
    }
  }

  useEffect(() => {
    if (state) {
      if (state.error.message) {
        setErrors((prev) => {
          return {
            ...prev,
            email: state.error.message,
          };
        });
      } else {
        redirect(`/verify-email/${state.user.email}`);
      }
    }
  }, [state]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your personal information to register an account
          <br />
        </p>
      </div>
      <div className="grid gap-6">
        {/* form */}
        <form className="grid gap-3" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              type="firstname"
              name="firstname"
              placeholder="First name"
            />
            {errors.firstname && (
              <span className="text-sm text-destructive">
                {errors.firstname}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="middlename">Middle name</Label>
            <Input
              name="middlename"
              id="middlename"
              placeholder="Middle name"
              type="text"
            />
            {errors.middlename && (
              <span className="text-sm text-destructive">
                {errors.middlename}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              name="lastname"
              id="lastname"
              placeholder="Last name"
              type="text"
            />
            {errors.lastname && (
              <span className="text-sm text-destructive">
                {errors.lastname}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="birthday">Birthday</Label>
            <Input
              name="birthday"
              id="birthday"
              placeholder="Last name"
              type="date"
              className="w-full"
            />
            {errors.birthday && (
              <span className="text-sm text-destructive">
                {errors.birthday}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              placeholder="email@example.com"
              type="email"
              className="w-full"
            />
            {errors.email && (
              <span className="text-sm text-destructive">{errors.email}</span>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              id="password"
              placeholder="Password"
              type="password"
              className="w-full"
            />
            {errors.password && (
              <span className="text-sm text-destructive">
                {errors.password}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password"
              type="password"
              className="w-full"
            />
            {errors.confirmPassword && (
              <span className="text-sm text-destructive">
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <Button
            disabled={isPending}
            type="submit"
            className="w-full cursor-pointer"
          >
            {isPending && <Loader className="animate-spin" />}
            Register
          </Button>
        </form>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href={`${BASE_URL}/login`} className="underline underline-offset-4">
          Login
        </a>
      </div>
    </div>
  );
}
