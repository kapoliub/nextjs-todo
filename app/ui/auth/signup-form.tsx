"use client";

import { Card, CardBody } from "@heroui/card";
import { useActionState } from "react";
import { Input } from "@heroui/input";

import PasswordInput from "./password-input";

import { registerUser } from "@/lib/actions/auth";
import { Form } from "@/app/ui/common";

export default function SignupForm() {
  const [state, action, isPending] = useActionState(registerUser, {
    errors: {},
  });

  return (
    <Card className="w-full">
      <CardBody>
        <Form
          skipFormReset
          action={action}
          className="flex flex-col gap-4 p-1"
          formError={state.errors._form}
          loading={isPending}
          submitButtonLabel="Sign Up"
        >
          <Input
            disabled={isPending}
            errorMessage={() => (
              <ul>
                {state.errors?.email?.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            isInvalid={!!state.errors?.email}
            label="Email"
            labelPlacement="outside-top"
            name="email"
            type="email"
          />
          <PasswordInput
            disabled={isPending}
            errorMessage={() => (
              <ul>
                {state.errors?.password?.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            isInvalid={!!state.errors?.password}
            label="Password"
            labelPlacement="outside-top"
            name="password"
          />
          <PasswordInput
            disabled={isPending}
            errorMessage={() => (
              <ul>
                {state.errors?.confirmPassword?.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            isInvalid={!!state.errors?.confirmPassword}
            label="Confirm Password"
            labelPlacement="outside-top"
            name="confirmPassword"
          />
        </Form>
      </CardBody>
    </Card>
  );
}
