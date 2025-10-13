"use client";

import { PATHS } from "@/lib/paths";
import { Button } from "@heroui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthButton() {
  const pathname = usePathname();
  const isSignupPage = pathname === PATHS.signup;
  const isWelcomePage = pathname === PATHS.welcome;

  return (
    <Button
      as={Link}
      color="primary"
      href={isSignupPage || isWelcomePage ? PATHS.login : PATHS.signup}
      variant="flat"
    >
      {isSignupPage || isWelcomePage ? "Login" : "Sign Up"}
    </Button>
  );
}
