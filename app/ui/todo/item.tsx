"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { ChangeEvent, useState } from "react";

import { CheckIcon, EditIcon, TrashIcon } from "@/app/ui/icons";
import { deleteTodo, editTodo, TodoData } from "@/lib/actions/todos";

export interface TodoItemProps extends TodoData {}

export default function TodoItem({ title, id }: TodoItemProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEdit = () => {
    setIsEditable(true);
    setInputValue((prev) => prev.trim());
  };

  const handleSave = () => {
    setIsEditable(false);

    if (inputValue.trim() !== title) {
      editTodo({ id, title: inputValue });
    }
  };

  return (
    <Card className="my-2">
      <CardBody className="w-full flex flex-row p-2">
        {isEditable ? (
          <Input value={inputValue} onChange={handleInputChange} />
        ) : (
          <div className="flex-1 m-auto">{inputValue}</div>
        )}
        <Button
          isIconOnly
          color="primary"
          onPress={isEditable ? handleSave : handleEdit}
        >
          {isEditable ? <CheckIcon /> : <EditIcon />}
        </Button>
        <Button isIconOnly onPress={() => deleteTodo(id)}>
          <TrashIcon />
        </Button>
      </CardBody>
    </Card>
  );
}
