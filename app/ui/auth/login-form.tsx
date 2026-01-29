"use client";

import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import PasswordInput from "./password-input";

import { loginUser } from "@/lib/actions/auth";
import {
  clearTodosFromLocalStorage,
  getStoredTodosFromLocalStorage,
} from "@/lib/utils/local-storage";
import { PATHS } from "@/lib/paths";
import { Form, LoadingSpinner } from "@/app/ui/common";

export default function LoginForm() {
  const { replace } = useRouter();
  const [state, action, isPending] = useActionState(
    loginUser.bind(null, getStoredTodosFromLocalStorage()),
    {
      success: false,
      errors: {},
    },
  );

  useEffect(() => {
    if (state.success) {
      clearTodosFromLocalStorage();
      replace(PATHS.todos());
    }
  }, [state]);

  if (state.success) {
    return <LoadingSpinner />;
  }

  return (
    <Card className="w-full">
      <CardBody>
        <Form
          skipFormReset
          action={action}
          className="flex flex-col gap-4 p-1"
          formError={state.errors._form}
          loading={isPending}
          submitButtonLabel="Login"
        >
          <Input
            autoComplete="email"
            disabled={isPending}
            errorMessage={() => (
              <ul>
                {state.errors.email?.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            isInvalid={!!state.errors.email}
            label="Email"
            labelPlacement="outside-top"
            name="email"
            type="email"
          />
          <PasswordInput
            autoComplete="password"
            disabled={isPending}
            errorMessage={() => (
              <ul>
                {state.errors.password?.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            isInvalid={!!state.errors.password}
            label="Password"
            labelPlacement="outside-top"
            name="password"
          />
        </Form>
      </CardBody>
    </Card>
  );
}
