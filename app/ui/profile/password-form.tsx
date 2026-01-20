"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { ChangeEvent, FormEvent, useState } from "react";
import z from "zod";

import { PASSWORD_SCHEMA } from "@/lib/utils/input-validations";
import { updateUser } from "@/lib/actions/auth";
import { PasswordInput } from "@/app/ui/common";
import { addErrorToast, addSuccessToast } from "@/lib/utils/toast";

interface PasswordFormErrors {
  newPassword?: string[];
  confirmNewPassword?: string[];
}

type InputsList = {
  label: string;
  name: keyof PasswordFormErrors;
}[];

const inputs: InputsList = [
  {
    label: "New Password",
    name: "newPassword",
  },
  {
    label: "Confirm New Password",
    name: "confirmNewPassword",
  },
];

const getFormValues = (formData: FormData) => ({
  newPassword: formData.get("newPassword")?.toString() ?? "",
  confirmNewPassword: formData.get("confirmNewPassword")?.toString() ?? "",
});

export default function PasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<PasswordFormErrors | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSchema = z
    .object({
      newPassword: PASSWORD_SCHEMA,
      confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "Passwords don't match",
      path: ["confirmNewPassword"],
    });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const { success, data, error } = formSchema.safeParse(
      getFormValues(formData),
    );

    if (!success) {
      setErrors(error.flatten().fieldErrors);

      return;
    }

    setErrors(null);
    setIsLoading(true);

    const { message } = await updateUser({ password: data.newPassword });

    if (message) {
      addErrorToast(message);
    } else {
      addSuccessToast("Password has been changed");
      setIsSubmitted(false);
      form.reset();
    }

    setIsLoading(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const form = e.target.form;

    if (!form || !isSubmitted) return;

    const formData = new FormData(form);

    const { success, error } = formSchema.safeParse(getFormValues(formData));

    if (!success) {
      setErrors(error.flatten().fieldErrors as PasswordFormErrors);

      return;
    }

    setErrors(null);
  };

  return (
    <Card className="min-w-[300px]">
      <CardBody>
        <form
          autoComplete="off"
          className="flex flex-col gap-4 p-1"
          onSubmit={handleSubmit}
        >
          {inputs.map(({ label, name }) => (
            <PasswordInput
              key={label}
              required
              autoComplete={name}
              disabled={isLoading}
              errorMessage={() => (
                <ul>
                  {errors?.[name]?.map((error) => <li key={error}>{error}</li>)}
                </ul>
              )}
              isInvalid={!!errors?.[name]?.[0]}
              label={label}
              labelPlacement="outside-top"
              name={name}
              onChange={handleInputChange}
            />
          ))}

          <Button disabled={isLoading} type="submit">
            Change Password
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
