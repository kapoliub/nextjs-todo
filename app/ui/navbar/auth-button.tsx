"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, UserPlus } from "lucide-react";

import { PATHS } from "@/lib/paths";

export default function AuthButtons() {
  const pathname = usePathname();
  const isSignupPage = pathname === PATHS.signup; // Assuming PATHS is a function based on previous context
  const isLoginPage = pathname === PATHS.login;

  return (
    <div className="flex items-center gap-2">
      {!isLoginPage && (
        <Button
          as={Link}
          className="font-medium text-default-600 hover:text-primary transition-colors"
          href={PATHS.login}
          size="sm"
          startContent={<LogIn size={16} />}
          variant="light"
        >
          Login
        </Button>
      )}

      {!isSignupPage && (
        <Button
          as={Link}
          className="font-bold px-5 bg-primary/10 hover:bg-primary/20 transition-all active:scale-95"
          color="primary"
          href={PATHS.signup}
          size="sm"
          startContent={<UserPlus size={16} />}
          variant="flat"
        >
          Sign Up
        </Button>
      )}
    </div>
  );
}
