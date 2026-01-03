"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { ChangeEvent, useState } from "react";
import { redirect, useParams } from "next/navigation";

import { PlusIcon } from "@/app/ui/icons";
import { createList } from "@/lib/actions/lists";
import { createTodo, CreateTodoParams } from "@/lib/actions/todos";
import { PATHS } from "@/lib/paths";

type LocalTodo = Omit<CreateTodoParams, "listId"> & {
  id?: string;
};
type ActionItem = "list" | "todo" | "localTodo";

interface AddItemInputProps {
  type: ActionItem;
  onSave?: (data: LocalTodo) => void;
}

type HandlersMap = Record<ActionItem, (value: string) => Promise<unknown>>;

export default function AddItemInput({
  type,
  onSave = () => {},
}: AddItemInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const isButtonDisabled = !inputValue.trim().length;

  const handleAddTodo = async (value: string) => {
    if (type === "localTodo") {
      onSave({ title: value });

      return;
    }

    if (!params.id) return;
    await createTodo({ title: value, listId: params.id as string });
    redirect(`${PATHS.todos}/${params.id}`);
  };

  const handlersMap: HandlersMap = {
    list: createList,
    todo: handleAddTodo,
    localTodo: handleAddTodo,
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
  };

  const handleSubmit = async () => {
    setInputValue("");
    setIsLoading(true);
    await handlersMap[type](inputValue.trim());
    setIsLoading(false);
  };

  return (
    <div className="flex">
      <Input color="success" value={inputValue} onChange={handleChange} />
      <Button
        isIconOnly
        className={`ml-1 ${isButtonDisabled && "cursor-not-allowed"}`}
        color="success"
        disabled={isButtonDisabled}
        isLoading={isLoading}
        onPress={handleSubmit}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
