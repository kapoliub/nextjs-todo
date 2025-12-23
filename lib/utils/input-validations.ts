import { z } from "zod";

export const PASSWORD_SCHEMA = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(32, "Password cannot exceed 32 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

export const EMAIL_SCHEMA = z.string().email("Invalid email address");

export const PHONE_SCHEMA = z
  .string()
  .regex(
    /^\+?[1-9]\d{1,14}$/,
    "Invalid phone number. Please use international format (e.g., +1234567890)",
  );

export const OPTIONAL_PHONE_SCHEMA = PHONE_SCHEMA.or(z.literal(""));
