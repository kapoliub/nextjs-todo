"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { FormEvent, useState, ChangeEvent } from "react";
import z from "zod";
import { addToast } from "@heroui/toast";
import { AuthError } from "@supabase/supabase-js";

import PasswordInput from "./password-input";

import { type AuthState } from "@/lib/actions/auth";

interface AuthFormErrors {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
}

interface AuthFormProps {
  type: "signup" | "login";
  onSubmit: (data: AuthState) => Promise<AuthError>;
}

type InputComponent = "input" | "passwordInput";

type InputsList = {
  label: string;
  name: keyof AuthFormErrors;
  component: InputComponent;
}[];

const passwordSchema = z
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

const inputs: InputsList = [
  {
    label: "Email",
    name: "email",
    component: "input",
  },
  {
    label: "Password",
    name: "password",
    component: "passwordInput",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    component: "passwordInput",
  },
];

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [errors, setErrors] = useState<AuthFormErrors | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isSignUpForm = type === "signup";

  const baseSignUpFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: isSignUpForm ? z.string() : z.undefined(),
  });

  const signUpFormSchema = baseSignUpFormSchema.refine(
    (data) => (isSignUpForm ? data.password === data.confirmPassword : true),
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const { success, data, error } = signUpFormSchema.safeParse({
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
      ...(isSignUpForm && {
        confirmPassword: formData.get("confirmPassword")?.toString() ?? "",
      }),
    });

    if (!success) {
      setErrors(error.flatten().fieldErrors);

      return;
    }

    setErrors(null);
    setIsLoading(true);

    const { message } = await onSubmit(data);

    if (message) {
      setIsLoading(false);
      addToast({
        title: "Error",
        color: "danger",
        description: message,
      });
    }
  };

  const clearError = (e: ChangeEvent<HTMLInputElement>) => {
    const { success, error } = baseSignUpFormSchema.shape[
      e.target.name as keyof typeof baseSignUpFormSchema.shape
    ].safeParse(e.target.value);

    setErrors((prev) => {
      const newErrors = { ...prev };

      if (success) {
        delete newErrors?.[e.target.name as keyof AuthFormErrors];
      }

      newErrors[e.target.name as keyof AuthFormErrors] =
        error?.flatten().formErrors;

      return newErrors;
    });
  };

  const InputComponents = {
    input: Input,
    passwordInput: PasswordInput,
  };

  return (
    <Card className="min-w-[300px]">
      <CardBody>
        <form
          autoComplete="off"
          className="flex flex-col gap-4 p-1"
          onSubmit={handleSubmit}
        >
          {inputs.map(({ component, label, name }) => {
            const Component = InputComponents[component];
            const isConfirmPassword = name === "confirmPassword";

            if (!isSignUpForm && isConfirmPassword) return null;

            return (
              <Component
                key={label}
                required
                disabled={isLoading}
                errorMessage={() => (
                  <ul>
                    {errors?.[name]?.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                )}
                isInvalid={!!errors?.[name]?.[0]}
                label={label}
                labelPlacement="outside-top"
                name={name}
                type={isConfirmPassword ? "password" : name}
                onChange={clearError}
              />
            );
          })}
          <Button disabled={isLoading} type="submit">
            {isSignUpForm ? "Sign Up" : "Login"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
