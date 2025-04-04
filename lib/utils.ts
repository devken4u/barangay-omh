import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function signToken({ payload }: { payload: any }) {
  const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
  if (!JWT_PRIVATE_KEY) {
    throw new Error("JWT_PRIVATE_KEY is not defined in environment variables");
  }

  try {
    const token = jwt.sign(payload, JWT_PRIVATE_KEY, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    return error;
  }
}

export function verifyToken(token: string) {
  const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
  if (!JWT_PRIVATE_KEY) {
    throw new Error("JWT_PRIVATE_KEY is not defined in environment variables");
  }

  try {
    return jwt.verify(token, JWT_PRIVATE_KEY);
  } catch (error) {
    return false;
  }
}
