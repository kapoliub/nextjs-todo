"use client";

import { PATHS } from "@/lib/paths";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function Welcome() {
  const [isHashValid, setIsHashValid] = useState(true);

  const requiredParts = [
    "access_token",
    "expires_in",
    "refresh_token",
    "type=signup",
  ];

  useEffect(() => {
    const hash = window.location.hash;
    const allPresent = requiredParts.every((part) => hash.includes(part));

    setIsHashValid(allPresent);
  }, []);

  console.log("Redirect url: ", process.env.NEXT_PUBLIC_VERCEL_URL);

  if (typeof window !== "undefined" && !isHashValid) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <h3>Welcome to our app.</h3>
      <span>
        Now you can{" "}
        <Link
          className="text-blue-600 dark:text-sky-400 hover:underline"
          href={PATHS.login}
        >
          login
        </Link>
      </span>
    </div>
  );
}
