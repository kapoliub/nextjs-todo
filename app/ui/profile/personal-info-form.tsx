"use client";

import { Card, CardBody } from "@heroui/card";
import { useActionState, useEffect } from "react";
import { Input } from "@heroui/input";

import { updatePersonalInfo } from "@/lib/actions/auth";
import { addSuccessToast } from "@/lib/utils/toast";
import { Form } from "@/app/ui/common";

interface PersonalInfoFormProps {
  email?: string;
  phone?: string;
}

export default function PersonalInfoForm({
  email = "",
  phone = "",
}: PersonalInfoFormProps) {
  const [state, action, isPending] = useActionState(updatePersonalInfo, {
    success: false,
    errors: {},
  });

  useEffect(() => {
    if (state.success) {
      addSuccessToast("Personal info updated successfully");
    }
  }, [state]);

  return (
    <Card className="bg-default-100/40 backdrop-blur-md border-default-200/50 shadow-sm overflow-visible">
      <CardBody className="p-6">
        <Form
          action={action}
          className="flex flex-col gap-6"
          formError={state.errors._form}
          loading={isPending}
          submitButtonLabel="Update Profile"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              defaultValue={email}
              errorMessage={state.errors.email?.join(", ")}
              isInvalid={!!state.errors.email}
              label="Email Address"
              labelPlacement="outside"
              name="email"
              placeholder="example@mail.com"
              variant="bordered"
            />
            <Input
              disabled
              defaultValue={phone}
              description="Phone updates are currently disabled"
              label="Phone Number"
              labelPlacement="outside"
              name="phone"
              placeholder="+38 (000) 000 0000"
              variant="faded"
            />
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
