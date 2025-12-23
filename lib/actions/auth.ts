/* eslint-disable no-console */
"use server";

import { redirect } from "next/navigation";
import { CredentialResponse } from "google-one-tap";

import { createClient } from "@/lib/supabase/server";
import { PATHS } from "@/lib/paths";

export interface AuthState {
  email: string;
  password: string;
}

export async function checkCurrentSession() {
  const { auth } = await createClient();
  const {
    data: { user },
    error,
  } = await auth.getUser();

  if (error) return false;

  return !!user;
}

export async function signInWithGoogle(
  response: CredentialResponse,
  nonce: string,
) {
  const { auth } = await createClient();
  let success = false;

  try {
    const { error } = await auth.signInWithIdToken({
      provider: "google",
      token: response.credential,
      nonce,
    });

    if (error) throw error;
    success = true;
  } catch (error) {
    console.error("Error logging in with Google One Tap", error);
    // Handle specific error UI here if needed
  }

  if (success) {
    redirect(PATHS.todos);
  }
}

export async function registerUser({ email, password }: AuthState) {
  const { auth } = await createClient();

  const { error } = await auth.signUp({
    email,
    password,
    options: {
      // TODO: handle diff envs
      emailRedirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL}${PATHS.welcome}`,
    },
  });

  if (error) {
    return error;
  }

  redirect(`${PATHS.checkYourEmail}?email=${email}`);
}

export async function loginUser({ email, password }: AuthState) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { message: error.message };

  return { message: "" };
}

export async function getUser() {
  const { auth } = await createClient();
  // @supabase/ssr automatically reads cookies and restores session
  const {
    data: { user },
    error,
  } = await auth.getUser();

  if (error) return null;

  return user;
}

export async function signOut() {
  const { auth } = await createClient();

  // 1. Revoke on server
  await auth.signOut();

  // 2. Clear cookies and redirect
  // Note: createClient's setAll logic usually handles cookie clearing on signOut,
  // but a redirect is required to refresh the client-side state.
  redirect(PATHS.login);
}

// export async function deleteUser() {
//   const { auth } = await createClient("admin");

//   const { data, error } = await auth.admin.deleteUser(
//     "19b5b67a-977a-414b-a5e9-1bf5d5953592",
//   );

//   await signOut();

//   if (error) {
//     console.error("Failed to delete user:", error);
//   } else {
//     console.log("Deleted user:", data);
//   }
// }

// export async function confirmUser() {
//   const { auth } = await createClient();

//   const { data, error } = await auth.verifyOtp({
//     token: "295423fc60424221474168608e1001d63dc4a27c11ac3602ff9da306",
//     type: "email",
//     email: "testuser124@gmail.com",
//   });

//   console.log({ data, error });
// }
