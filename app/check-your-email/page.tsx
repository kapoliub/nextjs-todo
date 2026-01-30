"use client";

import { Button } from "@heroui/button";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CheckYourEmail() {
  const params = useSearchParams();
  const email = params.get("email") ?? "your inbox";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="mb-6 p-5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary">
        <Mail size={40} strokeWidth={1.5} />
      </div>
      <div className="space-y-2 max-w-sm mb-8">
        <h2 className="text-2xl font-bold text-default-900 tracking-tight">
          Check your email
        </h2>
        <p className="text-default-500 text-sm leading-relaxed">
          We&apos;ve sent a confirmation link to <br />
          <span className="font-semibold text-default-900 break-all">
            {email}
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button
          as={Link}
          className="font-medium"
          color="primary"
          href="/"
          startContent={<ArrowLeft size={18} />}
          variant="solid"
        >
          Back to Home
        </Button>
        <p className="text-xs text-default-400">
          Didn&apos;t see it? Check your spam folder.
        </p>
      </div>
    </div>
  );
}
