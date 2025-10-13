"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { FormEvent, useState, ChangeEvent } from "react";
import z from "zod";
import { addToast } from "@heroui/toast";

import { loginUser } from "@/auth";

interface SignUpFormErrors {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
}

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

const SignUpFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
});

export default function SignupPage() {
  const [errors, setErrors] = useState<SignUpFormErrors | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const { success, data, error } = SignUpFormSchema.safeParse({
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
    });

    if (!success) {
      setErrors(error.flatten().fieldErrors);

      return;
    }

    setErrors(null);
    setIsLoading(true);

    const { message } = await loginUser(data);

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
    setErrors((prev) => {
      const newErrors = { ...prev };

      delete newErrors?.[e.target.name as keyof SignUpFormErrors];

      return newErrors;
    });
  };

  return (
    <Card className="w-[300px]">
      <CardBody>
        <form className="flex flex-col gap-4 p-1" onSubmit={handleSubmit}>
          <Input
            required
            disabled={isLoading}
            errorMessage={errors?.email?.[0]}
            isInvalid={!!errors?.email?.[0]}
            label="Email"
            labelPlacement="outside-top"
            name="email"
            type="email"
            onChange={clearError}
          />
          <Input
            required
            disabled={isLoading}
            errorMessage={errors?.password?.[0]}
            isInvalid={!!errors?.password?.[0]}
            label="Password"
            labelPlacement="outside-top"
            name="password"
            type="password"
            onChange={clearError}
          />
          <Button disabled={isLoading} type="submit">
            Login
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
