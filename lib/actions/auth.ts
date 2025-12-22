/* eslint-disable no-console */
"use server";

import { createClient, Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { CredentialResponse } from "google-one-tap";

import { saveTokens } from "../utils/tokens";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants";

import { PATHS } from "@/lib/paths";

export interface AuthState {
  email: string;
  password: string;
}

export interface OAuthState {
  provider?: Provider;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function checkCurrentSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Error getting session", error);
  }

  return !!data.session;
}

export async function signInWithGoogle(
  response: CredentialResponse,
  nonce: string,
) {
  try {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: response.credential,
      nonce,
    });

    if (error) throw error;
    await saveTokens(data.session);

    // redirect to protected page
  } catch (error) {
    console.error("Error logging in with Google One Tap", error);
  } finally {
    redirect(PATHS.todos);
  }
}

export async function registerUser({ email, password }: AuthState) {
  const { error } = await supabase.auth.signUp({
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
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { message: error.message };

  await saveTokens(data.session);

  return { message: "" };
}

export async function getUser() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  const refresh_token = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

  if (!access_token || !refresh_token) {
    return; // No session available
  }

  // Restore session for this request
  await supabase.auth.setSession({ access_token, refresh_token });

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return;
  }

  return data.user;
}

export async function signOut() {
  const cookieStore = await cookies();

  // 1. Restore session if needed
  const access_token = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  const refresh_token = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

  if (access_token && refresh_token) {
    await supabase.auth.setSession({ access_token, refresh_token });
  }

  // 2. Call Supabase to revoke tokens
  const { error } = await supabase.auth.signOut();

  if (error) console.error("Sign-out error:", error);

  // 3. Clear cookies
  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);

  // 4. Redirect to login page
  redirect(PATHS.login);
}

export async function deleteUser() {
  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(
    "19b5b67a-977a-414b-a5e9-1bf5d5953592",
  );

  await signOut();

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
