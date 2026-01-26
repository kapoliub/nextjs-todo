/* eslint-disable no-console */
"use server";

import { redirect } from "next/navigation";
import { CredentialResponse } from "google-one-tap";
import { SupabaseClient } from "@supabase/supabase-js";

import { loginUser } from "./login";
import registerUser from "./signup";
import { updatePersonalInfo, updatePassword } from "./update-user";

import { createClient } from "@/lib/supabase/server";
import { PATHS } from "@/lib/paths";

async function signInWithGoogle(response: CredentialResponse, nonce: string) {
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
    redirect(PATHS.todos());
  }
}

async function getUser(auth?: SupabaseClient["auth"]) {
  const authFn = auth || (await createClient()).auth;

  const {
    data: { user },
    error,
  } = await authFn.getUser();

  if (error) return null;

  return user;
}

async function signOut() {
  const { auth } = await createClient();

  await auth.signOut();

  redirect("/");
}

export {
  registerUser,
  signInWithGoogle,
  getUser,
  signOut,
  updatePersonalInfo,
  updatePassword,
  loginUser,
};

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
