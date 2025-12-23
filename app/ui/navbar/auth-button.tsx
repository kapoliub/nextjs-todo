"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PATHS } from "@/lib/paths";

export default function AuthButton() {
  const pathname = usePathname();
  const isSignupPage = pathname === PATHS.signup;
  const isWelcomePage = pathname === PATHS.welcome;
  const isRootPage = pathname === "/";

  const showLoginButton = isSignupPage || isWelcomePage || isRootPage;

  return (
    <Button
      as={Link}
      color="primary"
      href={showLoginButton ? PATHS.login : PATHS.signup}
      variant="flat"
    >
      {showLoginButton ? "Login" : "Sign Up"}
    </Button>
  );
}
