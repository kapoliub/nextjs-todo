import { redirect } from "next/navigation";
import z from "zod";

import { PATHS } from "@/lib/paths";
import { createClient } from "@/lib/supabase/server";
import { EMAIL_SCHEMA, PASSWORD_SCHEMA } from "@/lib/utils/input-validations";

interface SignUpFormState {
  errors: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
}

const signUpFormSchema = z
  .object({
    email: EMAIL_SCHEMA,
    password: PASSWORD_SCHEMA,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

async function registerUser(
  _: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  const { success, error, data } = signUpFormSchema.safeParse({
    email: formData.get("email")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
    confirmPassword: formData.get("confirmPassword")?.toString() ?? "",
  });

  if (!success) {
    return { errors: error.flatten().fieldErrors };
  }

  const { auth } = await createClient();

  const response = await auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      // TODO: handle diff envs
      emailRedirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL}${PATHS.welcome}`,
    },
  });

  if (response.error) {
    return { errors: { _form: [response.error.message] } };
  }

  redirect(PATHS.checkYourEmail(data.email));
}

export default registerUser;
