"use server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

import { PATHS } from "../paths";
import { StoredTodo } from "../helpers/localstorage";

import { createList } from "./lists";

import { createClient } from "@/lib/supabase/server";
import { getUserId } from "@/lib/helpers/user-info";
import { UpdateTodo } from "@/types";

export interface CreateTodoParams {
  listId: string;
  title: string;
  description?: string;
}

export async function createTodo({
  title,
  listId,
  description,
}: CreateTodoParams) {
  const supabase = await createClient();
  const userId = await getUserId(supabase.auth);

  if (!userId) return { error: "Unauthorized" };

  // Supabase now knows that 'data' is of type 'Todo' (Row)
  const { data, error } = await supabase
    .from("todos")
    .insert({
      title,
      list_id: listId,
      description,
      owner_id: userId,
    })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath(`${PATHS.todos}/${listId}`);

  return { data }; // data is typed as Todo
}

export async function syncTodosWithDB(todos: StoredTodo[]) {
  if (!todos.length) return;

  const supabase = await createClient();
  const userId = await getUserId(supabase.auth);

  if (!userId) return { error: "Unauthorized" };

  const { data } = await createList(
    `Local list: ${format(new Date(), "HH:mm dd/MM/yyyy")}`,
  );

  if (!data) return { error: "Failed to create list" };

  const todosToSync = todos.map(({ id: _, ...rest }) => ({
    ...rest,
    list_id: data?.id!,
    owner_id: userId,
  }));

  const { error } = await supabase.from("todos").insert(todosToSync).select();

  if (error) return { error: error.message };

  redirect(PATHS.todos);
}

// ------------------
// 2️⃣ Get todos owned by the current user
// ------------------
export async function getListTodos(id: string) {
  const supabase = await createClient();
  const userId = await getUserId(supabase.auth);

  if (!userId) return { error: "Unauthorized" };

  const { data: list } = await supabase
    .from("lists")
    .select("*")
    .eq("id", id)
    .eq("owner_id", userId)
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
  const userId = await getUserId(supabase.auth);

  if (!userId) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .eq("owner_id", userId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`${PATHS.todos}/${listId}`);
}

export async function editTodo(
  { id, title, description, is_completed }: UpdateTodo,
  listId: string,
) {
  const supabase = await createClient();
  const userId = await getUserId(supabase.auth);

  if (!userId) return { error: "Unauthorized" };
  if (!id) return { error: "Todo ID is required" };

  const { error } = await supabase
    .from("todos")
    .update({
      title,
      description,
      last_edit_by: userId,
      is_completed,
    })
    .eq("id", id)
    .eq("owner_id", userId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`${PATHS.todos}/${listId}`);
}
