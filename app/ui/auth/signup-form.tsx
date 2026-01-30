"use client";

import { useActionState } from "react";
import { UserPlus, Mail, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Input } from "@heroui/input";

import AuthCardWrapper from "./card-wrapper";

import { registerUser } from "@/lib/actions/auth";
import { Form, PasswordInput } from "@/app/ui/common";
import { PATHS } from "@/lib/paths";

export default function SignupForm() {
  const [state, action, isPending] = useActionState(registerUser, {
    errors: {},
  });

  return (
    <AuthCardWrapper
      headerIcon={<UserPlus size={32} strokeWidth={1.5} />}
      subtitle="Join us to start managing your tasks with ease"
      title="Create Account"
    >
      <Form
        skipFormReset
        action={action}
        className="flex flex-col gap-5"
        formError={state.errors?._form}
        loading={isPending}
        submitButtonLabel="Get Started"
      >
        <Input
          classNames={{
            inputWrapper:
              "h-12 border-default-200 group-data-[focus=true]:border-primary",
            label: "font-semibold text-default-600",
          }}
          disabled={isPending}
          errorMessage={state.errors?.email?.[0]}
          isInvalid={!!state.errors?.email}
          label="Email Address"
          labelPlacement="outside"
          name="email"
          placeholder="your@email.com"
          startContent={<Mail className="text-default-400" size={18} />}
          type="email"
          variant="bordered"
        />
        <PasswordInput
          classNames={{
            inputWrapper: "h-12 border-default-200",
            label: "font-semibold text-default-600",
          }}
          disabled={isPending}
          errorMessage={state.errors?.password?.[0]}
          isInvalid={!!state.errors?.password}
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="••••••••"
          startContent={<Lock className="text-default-400" size={18} />}
          variant="bordered"
        />
        <PasswordInput
          classNames={{
            inputWrapper: "h-12 border-default-200",
            label: "font-semibold text-default-600",
          }}
          disabled={isPending}
          errorMessage={state.errors?.confirmPassword?.[0]}
          isInvalid={!!state.errors?.confirmPassword}
          label="Confirm Password"
          labelPlacement="outside"
          name="confirmPassword"
          placeholder="••••••••"
          startContent={<ShieldCheck className="text-default-400" size={18} />}
          variant="bordered"
        />
      </Form>
      <div className="mt-8 flex justify-center gap-2">
        <p className="text-tiny text-default-400">Already a member?</p>
        <Link
          className="text-tiny text-primary font-bold hover:underline"
          href={PATHS.login}
        >
          Sign In
        </Link>
      </div>
    </AuthCardWrapper>
  );
}
