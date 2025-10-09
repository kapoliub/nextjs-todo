"use client";

// import { Form, Input } from "@heroui/react";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

import { authenticate } from "@/app/lib/actions";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <Form action={formAction}>
      <Input required disabled={isPending} label="Username" name="username" />
      <Input
        required
        disabled={isPending}
        label="Password"
        name="password"
        type="password"
      />
      {/* <input type="hidden" name="callbackUrl" value={callbackUrl} />   */}
      <Button disabled={isPending} type="submit">
        {isPending ? "Logging in..." : "Login"}
      </Button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </Form>
  );
}
