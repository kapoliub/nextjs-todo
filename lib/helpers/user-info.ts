import { SupabaseClient } from "@supabase/supabase-js";

export async function getUserId(auth: SupabaseClient["auth"]) {
  const {
    data: { user },
    error,
  } = await auth.getUser();

  if (error) return null;

  return user?.id || null;
}
