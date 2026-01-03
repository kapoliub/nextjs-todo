"use server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

import { PATHS } from "@/lib/paths";
import { createList } from "@/lib/actions/lists";
import { getUser } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { UpdateTodo } from "@/types";
import { StoredTodo } from "@/lib/utils/local-storage";

export interface CreateTodoParams {
  listId: string;
  title: string;
  description?: string;
}

interface EditTodoParams extends UpdateTodo {
  id: string;
}

export async function createTodo({
  title,
  listId,
  description,
}: CreateTodoParams) {
  const supabase = await createClient();
  const user = await getUser(supabase.auth);

  if (!user) return { error: "Unauthorized" };

  const { data, error } = await supabase
    .from("todos")
    .insert({
      title,
      list_id: listId,
      description,
      owner_id: user.id,
    })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath(`${PATHS.todos}/${listId}`);

  return { data };
}

export async function syncTodosWithDB(todos: StoredTodo[]) {
  if (!todos.length) return;

  const supabase = await createClient();
  const user = await getUser(supabase.auth);

  if (!user) return { error: "Unauthorized" };

  const { data } = await createList(
    `Local list: ${format(new Date(), "HH:mm dd/MM/yyyy")}`,
  );

  if (!data) return { error: "Failed to create list" };

  const todosToSync = todos.map(({ id: _, ...rest }) => ({
    ...rest,
    list_id: data.id,
    owner_id: user.id,
  }));

  const { error } = await supabase.from("todos").insert(todosToSync).select();

  if (error) return { error: error.message };

  redirect(PATHS.todos);
}

export async function getListTodos(id: string) {
  const supabase = await createClient();
  const user = await getUser(supabase.auth);

  if (!user) return { error: "Unauthorized" };
  const { data: list } = await supabase
    .from("lists")
    .select("*")
    .eq("id", id)
    .eq("owner_id", user.id)
    .single();

  if (!list) redirect(PATHS.todos);

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("list_id", id)
    .order("is_completed", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) return { error: error.message };

  return { data };
}

export async function deleteTodo(id: string, listId: string) {
  const supabase = await createClient();
  const user = await getUser(supabase.auth);

  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`${PATHS.todos}/${listId}`);
}

export async function editTodo(
  { id, title, description, is_completed }: EditTodoParams,
  listId: string,
) {
  const supabase = await createClient();
  const user = await getUser(supabase.auth);

  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("todos")
    .update({
      title,
      description,
      last_edit_by: user.id,
      is_completed,
    })
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) return { error: error.message };

  revalidatePath(`${PATHS.todos}/${listId}`);
}
