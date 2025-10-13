"use server";

import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface SignUpState {
  email: string;
  password: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function registerUser({ email, password }: SignUpState) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // TODO: handle diff envs
      emailRedirectTo: process.env.NEXT_PUBLIC_VERCEL_URL,
    },
  });

  if (error) {
    return error;
  }

  redirect("/check-your-email");
}

export async function loginUser({ email, password }: SignUpState) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return error;

  // Save session in HTTP-only cookies
  const cookieStore = await cookies();

  cookieStore.set("sb-access-token", data.session?.access_token!, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  cookieStore.set("sb-refresh-token", data.session?.refresh_token!, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  redirect("/");
}

export async function getUser() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("sb-access-token")?.value;
  const refresh_token = cookieStore.get("sb-refresh-token")?.value;

  if (!access_token || !refresh_token) {
    return null; // No session available
  }

  // Restore session for this request
  await supabase.auth.setSession({ access_token, refresh_token });

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data.user;
}

export async function signOut() {
  const cookieStore = await cookies();

  // 1. Restore session if needed
  const access_token = cookieStore.get("sb-access-token")?.value;
  const refresh_token = cookieStore.get("sb-refresh-token")?.value;

  if (access_token && refresh_token) {
    await supabase.auth.setSession({ access_token, refresh_token });
  }

  // 2. Call Supabase to revoke tokens
  const { error } = await supabase.auth.signOut();

  if (error) console.error("Sign-out error:", error);

  // 3. Clear cookies
  cookieStore.delete("sb-access-token");
  cookieStore.delete("sb-refresh-token");

  // 4. Redirect to login page
  redirect("/login");
}

export async function deleteUser() {
  await signOut();

  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(
    "a3cdc091-350f-4070-a025-e2674ceeefe3",
  );

  if (error) {
    console.error("Failed to delete user:", error);
  } else {
    console.log("Deleted user:", data);
  }
}

// export async function confirmUser() {
//   const { data, error } = await supabase.auth.verifyOtp({
//     token: "295423fc60424221474168608e1001d63dc4a27c11ac3602ff9da306",
//     type: "email",
//     email: "testuser124@gmail.com",
//   });

//   console.log({ data, error });
// }
