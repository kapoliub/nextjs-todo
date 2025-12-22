"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { ChangeEvent, useState } from "react";
import { useParams } from "next/navigation";

import { PlusIcon } from "@/app/ui/icons";
import { createList } from "@/lib/actions/lists";
import { createTodo, CreateTodoParams } from "@/lib/actions/todos";

type LocalTodo = Omit<CreateTodoParams, "listId"> & {
  id?: string;
};
type InputType = "list" | "todo";

interface AddItemInputProps {
  type: InputType;
  isLoggedIn: boolean;
  onSave?: (todo: LocalTodo) => void;
}

export default function AddItemInput({
  type,
  isLoggedIn,
  onSave,
}: AddItemInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const isButtonDisabled = !inputValue.trim().length;

  const handleAddList = async (value: string) => {
    const formattedValue = value.trim();

    if (!formattedValue) return;

    await createList({ title: formattedValue });
  };

  const handleAddTodo = async (value: string) => {
    const formattedValue = value.trim();

    if (!formattedValue) return;

    if (!isLoggedIn && onSave) {
      onSave({ title: formattedValue });
    }

    if (!params.id) return;
    await createTodo({ title: formattedValue, listId: params.id as string });
  };

  const handlersMap = {
    list: handleAddList,
    todo: handleAddTodo,
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
  };

  const handleSubmit = async () => {
    setInputValue("");
    setIsLoading(true);
    await handlersMap[type](inputValue);
    setIsLoading(false);
  };

  return (
    <div className="flex">
      <Input color="primary" value={inputValue} onChange={handleChange} />
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
