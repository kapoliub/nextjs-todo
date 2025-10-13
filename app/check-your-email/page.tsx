"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CheckYourEmail() {
  const params = useSearchParams();

  return (
    <div className="flex flex-col gap-4">
      <h3>Check {params.get("email") ?? "your email"} for confirmation link</h3>
      <Button as={Link} href="/">
        Go to Home
      </Button>
    </div>
  );
}
