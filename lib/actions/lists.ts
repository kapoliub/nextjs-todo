"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { PATHS } from "../paths";
import { createClient } from "../supabase/server";

import { getUserId } from "@/lib/helpers/user-info";
import { InsertList } from "@/types";

export interface ShareListData {
  listId: string;
  email: string;
  canEdit?: boolean;
}

export async function createList(title: InsertList["title"]) {
  const supabase = await createClient();
  const userId = await getUserId(supabase.auth);

  if (!userId) return { error: "Unauthorized" };

  const { data, error } = await supabase
    .from("lists")
    .insert({ title, owner_id: userId })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath(PATHS.todos);

  return { data };
}

export async function getUserLists() {
  const supabase = await createClient();
  const userId = await getUserId(supabase.auth);

  if (!userId) return { error: "Unauthorized" };

  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });

  if (error) return { error: error.message };

  return { data };
}

export async function deleteList(id: string, isSelected: boolean) {
  const supabase = await createClient();
  const userId = await getUserId(supabase.auth);

  if (!userId) return { error: "Unauthorized" };

  const { error, status } = await supabase
    .from("lists")
    .delete()
    .eq("id", id)
    .eq("owner_id", userId);

  if (error) {
    return { error: error.message };
  }

  if (status === 204 && isSelected) {
    redirect(PATHS.todos);
  }

  revalidatePath(PATHS.todos);

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
