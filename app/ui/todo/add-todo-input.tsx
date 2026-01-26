"use client";
import { useParams } from "next/navigation";
import { useActionState } from "react";
import { Input } from "@heroui/input";

import { Form } from "@/app/ui/common";
import { createTodo } from "@/lib/actions/todos";

export default function AddTodoInput() {
  const params = useParams();

  const [state, action, isPending] = useActionState(
    createTodo.bind(null, params.listId as string),
    {
      errors: {},
    },
  );

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
