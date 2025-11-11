"use server";

import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { PATHS } from "../paths";

import { getUser } from "./auth";

// ------------------
// Types
// ------------------

interface CreateListParams {
  title: string;
}

export interface ListData {
  title: string;
  id: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  todos_count: number;
}

export interface ShareListData {
  listId: string;
  email: string;
  canEdit?: boolean;
}

// ------------------
// Supabase clients
// ------------------
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Helper to restore user session from cookies
// async function getSupabaseUser() {
//   const cookieStore = await cookies();
//   const access_token = cookieStore.get("sb-access-token")?.value;
//   const refresh_token = cookieStore.get("sb-refresh-token")?.value;

//   if (!access_token || !refresh_token) {
//     return { user: null };
//   }

//   await supabase.auth.setSession({ access_token, refresh_token });
//   const { data, error } = await supabase.auth.getUser();

//   if (error || !data?.user) return { user: null };

//   return { user: data.user };
// }

// ------------------
// 1️⃣ Create a new list
// ------------------
export async function createList({ title }: CreateListParams) {
  const user = await getUser();

  if (!user) return { error: "Unauthorized" };

  const { data, error } = await supabase
    .from("lists")
    .insert({ title, owner_id: user.id })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath(PATHS.todos);

  return data as ListData;
}

// ------------------
// 2️⃣ Get lists owned by the current user
// ------------------
export async function getUserLists(): Promise<{
  data?: ListData[];
  error?: string;
}> {
  const user = await getUser();

  if (!user) return { error: "Unauthorized" };

  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return { error: error.message };

  return { data };
}

export async function deleteList(id: string) {
  const user = await getUser();

  if (!user) return { error: "Unauthorized" };

  const { error, status } = await supabase
    .from("lists")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) {
    return { error: error.message };
  }

  if (status === 204) {
    revalidatePath(PATHS.todos);
    redirect(PATHS.todos);
  }

  // return response;
}

// // ------------------
// // 3️⃣ Get all lists shared *with* the current user
// // ------------------
// export async function getSharedLists() {
//   const user = await getUser();

//   if (!user) return { error: "Unauthorized" };

//   const { data, error } = await supabase
//     .from("list_shares")
//     .select("lists(*)")
//     .eq("user_id", user.id);

//   if (error) return { error: error.message };

//   return { data: data?.map((share) => share.lists) };
// }

// // ------------------
// // 4️⃣ Share a list with another user by email
// // ------------------
// export async function shareListByEmail({
//   listId,
//   email,
//   canEdit = false,
// }: ShareListData) {
//   // Find user by email via admin API
//   const { data, error: userError } = await supabaseAdmin.auth.admin.listUsers();

//   if (userError) return { error: userError.message };

//   const targetUser = data.users.find((u) => u.email === email);

//   if (!targetUser) return { error: "User not found" };

//   const { error } = await supabase.from("list_shares").insert({
//     list_id: listId,
//     user_id: targetUser.id,
//     can_edit: canEdit,
//   });

//   if (error) return { error: error.message };

//   return { success: true };
// }

// // ------------------
// // 5️⃣ Get all users a list is shared with
// // ------------------
// export async function getListShares(listId: string) {
//   const { data, error } = await supabase
//     .from("list_shares")
//     .select("id, user_id, can_edit, created_at")
//     .eq("list_id", listId);

//   if (error) return { error: error.message };

//   return { data };
// }

// // ------------------
// // 6️⃣ Revoke access for a shared user
// // ------------------
// export async function revokeShare(listShareId: string) {
//   const { error } = await supabase
//     .from("list_shares")
//     .delete()
//     .eq("id", listShareId);

//   if (error) return { error: error.message };

//   return { success: true };
// }
