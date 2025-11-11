"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

import { PATHS } from "../paths";

import { getUser } from "./auth";

// ------------------
// Types
// ------------------

interface CreateTodoParams {
  listId: string;
  title: string;
  description?: string;
}

interface EditTodosParams {
  id: string;
  title: string;
  description?: string;
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

  revalidatePath(PATHS.todos);
}

export async function editTodo({ id, title, description }: EditTodosParams) {
  const user = await getUser();

  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("todos")
    .update({ title, description })
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(PATHS.todos);
}

export async function getTodosCount(listId: string) {
  const { count, error } = await supabase
    .from("todos")
    .select("*", { count: "exact", head: true }) // head: true avoids returning rows
    .eq("list_id", listId);

  if (error) {
    console.error(error);

    return 0;
  }

  return count ?? 0;
}
