"use client";
import { useActionState, useEffect } from "react";
import { Input } from "@heroui/input";
import { useRouter } from "next/navigation";

import { Form } from "@/app/ui/common";
import { createList } from "@/lib/actions/lists";
import { PATHS } from "@/lib/paths";

export default function AddListInput() {
  const { replace } = useRouter();
  const [state, action, isPending] = useActionState(createList, {
    errors: {},
  });

  useEffect(() => {
    if (state.newListId) {
      replace(PATHS.todos(state.newListId));
    }
  }, [state]);

  return (
    <Form
      action={action}
      className="flex gap-2"
      formError={state.errors._form}
      loading={isPending}
    >
      <Input
        color="success"
        disabled={isPending}
        isInvalid={!!state.errors.title}
        name="title"
        type="text"
      />
    </Form>
  );
}
