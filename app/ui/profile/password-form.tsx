"use client";

import { Card, CardBody } from "@heroui/card";
import { useActionState, useEffect } from "react";

import { updatePassword } from "@/lib/actions/auth";
import { Form, PasswordInput } from "@/app/ui/common";
import { addSuccessToast } from "@/lib/utils/toast";

export default function PasswordForm() {
  const [state, action, isPending] = useActionState(updatePassword, {
    success: false,
    errors: {},
  });

  useEffect(() => {
    if (state.success) {
      addSuccessToast("Password updated successfully");
    }
  }, [state]);

  return (
    <Card className="min-w-[300px]">
      <CardBody>
        <Form
          action={action}
          className="flex flex-col gap-4 p-1"
          formError={state.errors._form}
          loading={isPending}
          submitButtonLabel="Change Password"
        >
          <PasswordInput
            autoComplete="off"
            disabled={isPending}
            errorMessage={() => (
              <ul>
                {state.errors.newPassword?.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            isInvalid={!!state.errors.newPassword}
            label="New Password"
            labelPlacement="outside-top"
            name="newPassword"
          />
          <PasswordInput
            autoComplete="off"
            disabled={isPending}
            errorMessage={() => (
              <ul>
                {state.errors.confirmNewPassword?.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            isInvalid={!!state.errors.confirmNewPassword}
            label="Confirm New Password"
            labelPlacement="outside-top"
            name="confirmNewPassword"
          />
        </Form>
      </CardBody>
    </Card>
  );
}
