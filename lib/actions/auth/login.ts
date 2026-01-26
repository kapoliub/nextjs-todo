import z from "zod";

import { syncTodosWithDB } from "@/lib/actions/todos";
import { StoredTodo } from "@/lib/utils/local-storage";
import { EMAIL_SCHEMA } from "@/lib/utils/input-validations";
import { createClient } from "@/lib/supabase/server";

interface LoginFormState {
  success: boolean;
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

const loginFormSchema = z.object({
  email: EMAIL_SCHEMA,
  password: z.string(),
});

export async function loginUser(
  todosToSync: StoredTodo[],
  _: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const { success, error, data } = loginFormSchema.safeParse({
    email: formData.get("email")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
  });

  if (!success) {
    return { errors: error.flatten().fieldErrors, success: false };
  }

  const { auth } = await createClient();

  const response = await auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  await syncTodosWithDB(todosToSync);

  if (response.error)
    return {
      success: false,
      errors: {
        _form: [response.error.message],
      },
    };

  return { success: true, errors: {} };
}
