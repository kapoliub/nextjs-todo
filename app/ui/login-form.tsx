"use client";

import { Form, Input } from "@heroui/react";
import { Button } from "@heroui/button";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <Form action={formAction}>
      <Input name="username" label="Username" required disabled={isPending} />
      <Input
        name="password"
        label="Password"
        type="password"
        required
        disabled={isPending}
      />
      {/* <input type="hidden" name="callbackUrl" value={callbackUrl} />   */}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </Form>
  );
}
