"use server";

import { Session } from "@supabase/supabase-js";
import { cookies } from "next/headers";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants";

export const saveTokens = async (session: Session) => {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_KEY, session?.access_token!, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  cookieStore.set(REFRESH_TOKEN_KEY, session?.refresh_token!, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};

export const generateNonce = async (): Promise<string[]> => {
  const nonce = btoa(
    String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))),
  );
  const encoder = new TextEncoder();
  const encodedNonce = encoder.encode(nonce);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedNonce);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedNonce = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return [nonce, hashedNonce];
};
