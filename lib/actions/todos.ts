"use server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { format } from "date-fns";

import { PATHS } from "../paths";
import { StoredTodo } from "../helpers/localstorage";

import { getUser } from "./auth";
import { createList } from "./lists";

// ------------------
// Types
// ------------------

export interface CreateTodoParams {
  listId: string;
  title: string;
  description?: string;
}

interface EditTodosParams {
  id: string;
  title?: string;
  description?: string;
  isCompleted?: boolean;
}

export interface TodoData {
  id: string;
  owner_id: string;
  list_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  is_completed: boolean;
  description?: string;
  last_edit_by?: string;
}

// ------------------
// Supabase clients
// ------------------
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// ------------------
// 1️⃣ Create a new todo
// ------------------
export async function createTodo({
  title,
  listId,
  description,
}: CreateTodoParams) {
  const user = await getUser();

  if (!user) return { error: "Unauthorized" };

  const { data, error } = await supabase
    .from("todos")
    .insert({ title, list_id: listId, description, owner_id: user.id })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath(`${PATHS.todos}/${listId}`);

  return { data };
}

export async function syncTodosWithDB(todos: StoredTodo[]) {
  if (!todos.length) return;

  const user = await getUser();

  if (!user) return { error: "Unauthorized" };

  const { data } = await createList({
    title: `Local list: ${format(new Date(), "HH:mm dd/MM/yyyy")}`,
  });

  if (!data) return { error: "Failed to create list" };

  const todosToSync = todos.map(({ id: _, ...rest }) => ({
    ...rest,
    list_id: data?.id!,
    owner_id: user.id,
  }));

  const { error } = await supabase.from("todos").insert(todosToSync).select();

  if (error) return { error: error.message };

  redirect(PATHS.todos);
}

// ------------------
// 2️⃣ Get todos owned by the current user
// ------------------
export async function getListTodos(id: string): Promise<{
  data?: TodoData[];
  error?: string;
}> {
  const user = await getUser();

  if (!user) return { error: "Unauthorized" };

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("list_id", id)
    .order("created_at", { ascending: false });

  if (error) return { error: error.message };

  return { data };
}

export async function deleteTodo(id: string) {
  const user = await getUser();

  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`${PATHS.todos}/${id}`);
}

export async function editTodo({
  id,
  title,
  description,
  isCompleted,
}: EditTodosParams) {
  const user = await getUser();

  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("todos")
    .update({
      title,
      description,
      last_edit_by: user.id,
      is_completed: isCompleted,
    })
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`${PATHS.todos}/${id}`);
}
