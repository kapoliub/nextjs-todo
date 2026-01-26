"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PATHS } from "@/lib/paths";

export default function AuthButtons() {
  const pathname = usePathname();
  const isSignupPage = pathname === PATHS.signup;
  const isLoginPage = pathname === PATHS.login;

  return (
    <div className="flex gap-2">
      {!isLoginPage && (
        <Button as={Link} color="primary" href={PATHS.login} variant="flat">
          Login
        </Button>
      )}
      {!isSignupPage && (
        <Button as={Link} color="primary" href={PATHS.signup} variant="flat">
          Sign Up
        </Button>
      )}
    </div>
  );
}
