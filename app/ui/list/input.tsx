"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { ChangeEvent, useState } from "react";
import { useParams } from "next/navigation";

import { PlusIcon } from "@/app/ui/icons";
import { createList } from "@/lib/actions/lists";
import { createTodo } from "@/lib/actions/todos";

type InputType = "list" | "todo";

interface AddItemInputProps {
  type: InputType;
}

export default function AddItemInput({ type }: AddItemInputProps) {
  const [inputValue, setInputValue] = useState("");
  const params = useParams();

  const handleAddList = async (value: string) => {
    await createList({ title: value });
  };

  const handleAddTodo = async (value: string) => {
    if (!params.id) return;
    await createTodo({ title: value, listId: params.id as string });
  };

  const handlersMap = {
    list: handleAddList,
    todo: handleAddTodo,
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
  };

  const handleSubmit = () => {
    setInputValue("");
    handlersMap[type](inputValue);
  };

  return (
    <div className="flex">
      <Input color="primary" value={inputValue} onChange={handleChange} />
      <Button
        isIconOnly
        color="success"
        disabled={!inputValue.length}
        onPress={handleSubmit}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
