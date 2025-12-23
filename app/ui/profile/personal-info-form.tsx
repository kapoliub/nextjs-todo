"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { ChangeEvent, FormEvent, useState } from "react";
import z from "zod";
import { addToast } from "@heroui/toast";
import { Input } from "@heroui/input";

import {
  EMAIL_SCHEMA,
  OPTIONAL_PHONE_SCHEMA,
} from "@/lib/utils/input-validations";
import { updateUser } from "@/lib/actions/auth";

interface PersonalInfoFormProps {
  email?: string;
  phone?: string;
}

interface PersonalInfoFormErrors {
  email?: string[];
  phone?: string[];
}

type InputsList = {
  label: string;
  name: keyof PersonalInfoFormErrors;
  inputType: "email" | "text" | "tel";
}[];

const inputs: InputsList = [
  {
    label: "Email",
    name: "email",
    inputType: "email",
  },
  {
    label: "Phone (temporary unsupported)",
    name: "phone",
    inputType: "tel",
  },
];

const getFormValues = (formData: FormData) => ({
  email: formData.get("email")?.toString() ?? "",
  phone: formData.get("phone")?.toString() ?? "",
});

export default function PersonalInfoForm({
  email = "",
  phone = "",
}: PersonalInfoFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<PersonalInfoFormErrors | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSchema = z.object({
    email: EMAIL_SCHEMA,
    phone: OPTIONAL_PHONE_SCHEMA,
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

    if (data.email === email && data.phone === phone) {
      addToast({
        title: "Info",
        color: "default",
        description: "No changes detected",
      });

      setIsSubmitted(false);

      return;
    }

    setErrors(null);
    setIsLoading(true);

    const { message } = await updateUser({
      email: data.email,
      phone: data.phone,
    });

    if (message) {
      addToast({
        title: "Error",
        color: "danger",
        description: message,
      });
    } else {
      addToast({
        title: "Success",
        color: "success",
        description: "Password changed successfully",
      });

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
      setErrors(error.flatten().fieldErrors as PersonalInfoFormErrors);

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
          {inputs.map(({ label, name, inputType }) => (
            <Input
              key={label}
              autoComplete={name}
              defaultValue={name === "email" ? email : phone}
              disabled={isLoading || name === "phone"}
              errorMessage={() => (
                <ul>
                  {errors?.[name]?.map((error) => <li key={error}>{error}</li>)}
                </ul>
              )}
              isInvalid={!!errors?.[name]?.[0]}
              label={label}
              labelPlacement="outside-top"
              name={name}
              type={inputType}
              onChange={handleInputChange}
            />
          ))}

          <Button disabled={isLoading} type="submit">
            Change Personal Info
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
