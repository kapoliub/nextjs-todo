"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { Input } from "@heroui/input";

import AuthCardWrapper from "./card-wrapper";

import { loginUser } from "@/lib/actions/auth";
import {
  getStoredTodosFromLocalStorage,
  clearTodosFromLocalStorage,
} from "@/lib/utils/local-storage";
import { PATHS } from "@/lib/paths";
import { Form, LoadingSpinner, PasswordInput } from "@/app/ui/common";

export default function LoginForm() {
  const { replace } = useRouter();
  const [state, action, isPending] = useActionState(
    loginUser.bind(null, getStoredTodosFromLocalStorage()),
    { success: false, errors: {} },
  );

  useEffect(() => {
    if (state.success) {
      clearTodosFromLocalStorage();
      replace(PATHS.todos());
    }
  }, [state, replace]);

  if (state.success) return <LoadingSpinner />;

  return (
    <AuthCardWrapper
      headerIcon={<LogIn size={32} strokeWidth={1.5} />}
      subtitle="Enter your credentials to access your tasks"
      title="Welcome Back"
    >
      <Form
        skipFormReset
        action={action}
        className="flex flex-col gap-5"
        formError={state.errors?._form}
        loading={isPending}
        submitButtonLabel="Login to Account"
      >
        <Input
          autoComplete="email"
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

        <div className="space-y-1">
          <PasswordInput
            autoComplete="current-password"
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
          <div className="flex justify-end">
            <button
              className="text-tiny text-primary hover:underline"
              type="button"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </Form>
      <div className="mt-8 flex justify-center gap-2">
        <p className="text-tiny text-default-400">New here?</p>
        <Link
          className="text-tiny text-primary font-bold hover:underline"
          href="/signup"
        >
          Create an account
        </Link>
      </div>
    </AuthCardWrapper>
  );
}
