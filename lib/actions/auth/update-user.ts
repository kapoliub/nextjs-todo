import z from "zod";
import { UserAttributes } from "@supabase/supabase-js";

import {
  EMAIL_SCHEMA,
  OPTIONAL_PHONE_SCHEMA,
  PASSWORD_SCHEMA,
} from "@/lib/utils/input-validations";
import { createClient } from "@/lib/supabase/server";

interface PersonalInfoFormState {
  success: boolean;
  errors: {
    email?: string[];
    phone?: string[];
    _form?: string[];
  };
}

interface PasswordFormState {
  success: boolean;
  errors: {
    newPassword?: string[];
    confirmNewPassword?: string[];
    _form?: string[];
  };
}

const personalInfoFormSchema = z.object({
  email: EMAIL_SCHEMA,
  phone: OPTIONAL_PHONE_SCHEMA,
});

const passwordFormSchema = z
  .object({
    newPassword: PASSWORD_SCHEMA,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords doesn't match",
    path: ["confirmNewPassword"],
  });

async function updateUser(newData: UserAttributes) {
  const { auth } = await createClient();

  const { error } = await auth.updateUser({
    ...newData,
  });

  if (error) {
    return { message: error.message };
  }

  return { message: "" };
}

async function updatePersonalInfo(
  _: PersonalInfoFormState,
  formData: FormData,
): Promise<PersonalInfoFormState> {
  const { success, error, data } = personalInfoFormSchema.safeParse({
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
  });

  if (!success) {
    return { errors: error.flatten().fieldErrors, success: false };
  }

  const { message } = await updateUser({
    email: data.email,
    phone: data.phone,
  });

  if (message) {
    return { errors: { _form: [message] }, success: false };
  }

  return { errors: {}, success: true };
}

async function updatePassword(
  _: PasswordFormState,
  formData: FormData,
): Promise<PasswordFormState> {
  const { success, error, data } = passwordFormSchema.safeParse({
    newPassword: formData.get("newPassword")?.toString() ?? "",
    confirmNewPassword: formData.get("confirmNewPassword")?.toString() ?? "",
  });

  if (!success) {
    return { errors: error.flatten().fieldErrors, success: false };
  }

  const { message } = await updateUser({
    password: data.newPassword,
  });

  if (message) {
    return { errors: { _form: [message] }, success: false };
  }

  return { errors: {}, success: true };
}

export { updatePersonalInfo, updatePassword };
