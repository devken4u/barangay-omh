import { object, string, date } from "zod";
import z from "zod";
export const SignInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" }).min(
    1,
    "Password is required"
  ),
});
export const RegisterSchema = object({
  firstname: string({ required_error: "First name is required" }).min(
    1,
    "First name is required"
  ),
  middlename: string().optional(),
  lastname: string({ required_error: "Last name is required" }).min(
    1,
    "Last name is required"
  ),
  birthday: date({ required_error: "Birthday is required" }),
  email: string().email("Invalid email format"),
  password: string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
export type RegisterType = z.infer<typeof RegisterSchema>;
