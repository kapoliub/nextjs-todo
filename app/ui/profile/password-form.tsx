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
    <Card className="bg-default-100/40 backdrop-blur-md border-default-200/50 shadow-sm">
      <CardBody className="p-6">
        <Form
          action={action}
          className="flex flex-col gap-6"
          formError={state.errors._form}
          loading={isPending}
          submitButtonLabel="Change Password"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PasswordInput
              errorMessage={state.errors.newPassword?.join(", ")}
              isInvalid={!!state.errors.newPassword}
              label="New Password"
              labelPlacement="outside"
              name="newPassword"
              placeholder="••••••••"
              variant="bordered"
            />

            <PasswordInput
              errorMessage={state.errors.confirmNewPassword?.join(", ")}
              isInvalid={!!state.errors.confirmNewPassword}
              label="Confirm New Password"
              labelPlacement="outside"
              name="confirmNewPassword"
              placeholder="••••••••"
              variant="bordered"
            />
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
