import { revalidatePath } from "next/cache";
import z from "zod";

import { getUser } from "@/lib/actions/auth";
import { PATHS } from "@/lib/paths";
import { createClient } from "@/lib/supabase/server";

interface CreateTodoFormState {
  errors: {
    title?: string[];
    _form?: string[];
  };
}

const createTodoFormSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty"),
});

async function createTodo(
  listId: string,
  _: CreateTodoFormState,
  formData: FormData,
): Promise<CreateTodoFormState> {
  if (!listId) {
    return { errors: { _form: ["ListId is missing"] } };
  }

  const { success, error, data } = createTodoFormSchema.safeParse({
    title: formData.get("title")?.toString() ?? "",
  });

  if (!success) {
    return { errors: error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const user = await getUser(supabase.auth);

  if (!user) return { errors: { _form: ["Unauthorized"] } };

  const response = await supabase
    .from("todos")
    .insert({
      title: data.title,
      list_id: listId,
      owner_id: user.id,
    })
    .select()
    .single();

  if (response.error) return { errors: { _form: [response.error.message] } };

  revalidatePath(PATHS.todos(listId));

  return { errors: {} };
}

export default createTodo;
