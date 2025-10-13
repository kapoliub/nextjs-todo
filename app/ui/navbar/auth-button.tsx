"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthButton() {
  const pathname = usePathname();
  const isSignupPage = pathname === "/signup";

  return (
    <Button
      as={Link}
      color="primary"
      href={isSignupPage ? "/login" : "/signup"}
      variant="flat"
    >
      {isSignupPage ? "Login" : "Sign Up"}
    </Button>
  );
}
