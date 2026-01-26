"use client";

import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { ChangeEvent, useState } from "react";

import { PlusIcon } from "@/app/ui/icons";

interface AddLocalTodoInputProps {
  onSave: (value: string) => void;
}

export default function AddLocalTodoInput({ onSave }: AddLocalTodoInputProps) {
  const [inputValue, setInputValue] = useState("");

  const isButtonDisabled = !inputValue.trim().length;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
  };

  const handleSubmit = async () => {
    setInputValue("");
    onSave(inputValue.trim());
  };

  return (
    <div className="flex">
      <Textarea
        color="warning"
        minRows={1}
        value={inputValue}
        onChange={handleChange}
      />
      <Button
        isIconOnly
        className={`ml-2 ${isButtonDisabled && "cursor-not-allowed"}`}
        color="success"
        disabled={isButtonDisabled}
        onPress={handleSubmit}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
