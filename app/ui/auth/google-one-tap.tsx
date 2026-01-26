"use client";
import type { accounts, CredentialResponse } from "google-one-tap";

import Script from "next/script";

import { generateNonce } from "@/lib/utils/tokens";
import { getUser, signInWithGoogle } from "@/lib/actions/auth";

declare const google: { accounts: accounts };

const OneTapComponent = () => {
  const initializeGoogleOneTap = async () => {
    const [nonce, hashedNonce] = await generateNonce();

    const session = await getUser();

    if (session) return;

    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: async (response: CredentialResponse) => {
        signInWithGoogle(response, nonce);
      },
      nonce: hashedNonce,
      use_fedcm_for_prompt: true,
    });
    google.accounts.id.prompt();
  };

  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      onReady={() => {
        initializeGoogleOneTap();
      }}
    />
  );
};

export default OneTapComponent;
