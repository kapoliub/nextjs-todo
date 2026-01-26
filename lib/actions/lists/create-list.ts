import z from "zod";
import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/actions/auth";
import { InsertList } from "@/types";
import { createClient } from "@/lib/supabase/server";
import { PATHS } from "@/lib/paths";

interface CreateListFormState {
  newListId?: string;
  errors: {
    title?: string[];
    _form?: string[];
  };
}

const createListFormSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty"),
});

export async function createList(
  _: CreateListFormState,
  formData: FormData,
): Promise<CreateListFormState> {
  const { success, error, data } = createListFormSchema.safeParse({
    title: formData.get("title")?.toString() ?? "",
  });

  if (!success) {
    return { errors: error.flatten().fieldErrors };
  }

  const response = await addList(data.title);

  if (response.error) {
    return { errors: { _form: [response.error] } };
  }

  if (response.data) {
    revalidatePath(PATHS.todos());
  }

  return { errors: {}, newListId: response.data?.id };
}

export async function addList(title: InsertList["title"]) {
  const supabase = await createClient();
  const user = await getUser(supabase.auth);

  if (!user) return { error: "Unauthorized" };
  if (!title.length) return { error: "Title required" };

  const { data, error } = await supabase
    .from("lists")
    .insert({ title, owner_id: user.id })
    .select()
    .single();

  if (error) return { error: error.message };

  return { data };
}
