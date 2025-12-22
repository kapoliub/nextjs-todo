"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { ChangeEvent, useRef, useState } from "react";
import { Checkbox } from "@heroui/checkbox";

import ButtonWithModal from "../common/button-with-modal";

import { CheckIcon } from "@/app/ui/icons";
import { deleteTodo, editTodo } from "@/lib/actions/todos";
import { StoredTodo } from "@/lib/helpers/localstorage";
import { useClickOutside } from "@/lib/hooks/use-outside-click";

export interface TodoItemProps extends StoredTodo {
  onDelete?: (id: string) => void;
  onEdit?: (todo: StoredTodo) => void;
}

export default function TodoItem({
  title,
  id,
  onDelete,
  onEdit,
  ...todoProps
}: TodoItemProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const [isChecked, setIsChecked] = useState(todoProps.is_completed);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEdit = () => {
    if (isChecked || isLoading) return;
    setIsEditable(true);

    setTimeout(() => {
      const input = inputRef.current;

      input?.focus();
      input?.setSelectionRange(input.value.length, input.value.length);
    }, 100);
  };

  const handleSave = async () => {
    setIsEditable(false);

    if (inputValue.trim() !== title) {
      const formattedValue = inputValue.trim().replace(/[^\S\n]+/g, " ");

      setInputValue(formattedValue);
      setIsLoading(true);
      await editTodo({ id, title: formattedValue });
      onEdit?.({ ...todoProps, id, title: formattedValue });
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteTodo(id);
    onDelete?.(id);
    setIsLoading(false);
  };

  const handleCancelEdit = () => {
    setIsEditable(false);
    setInputValue(title);
  };

  const handleCheckboxChange = async (value: boolean) => {
    setIsChecked(value);
    setIsLoading(true);
    await editTodo({ id, isCompleted: value });
    setIsLoading(false);
  };

  const editableRef = useClickOutside(handleCancelEdit);

  return (
    <Card className="my-2">
      <CardBody
        className={`w-full flex flex-row p-2 ${isChecked && "opacity-50 bg-green-200"}`}
      >
        <Checkbox
          classNames={{
            base: "p-0 mx-0",
            wrapper: "mr-0",
          }}
          color="success"
          disabled={isLoading}
          isSelected={isChecked}
          onValueChange={handleCheckboxChange}
        />
        {isEditable ? (
          <Textarea
            ref={inputRef}
            baseRef={editableRef}
            classNames={{
              base: "px-1 pb-1",
              input: "text-base",
              innerWrapper: "flex items-center",
            }}
            minRows={1}
            value={inputValue}
            variant="underlined"
            onChange={handleInputChange}
          />
        ) : (
          <div
            ref={editableRef}
            className={`flex-1 m-auto ${isChecked ? "cursor-not-allowed" : "cursor-text"} mx-2 my-2 border-b-2 border-transparent`}
            role="presentation"
            onClick={handleEdit}
          >
            <p className="whitespace-pre-line text-6">{inputValue}</p>
          </div>
        )}
        {isEditable ? (
          <>
            <Button
              isIconOnly
              color="primary"
              disabled={isLoading}
              onPress={handleSave}
            >
              <CheckIcon />
            </Button>
            <Button isIconOnly disabled={isLoading} onPress={handleCancelEdit}>
              X
            </Button>
          </>
        ) : (
          <ButtonWithModal
            buttonProps={{ color: "danger" }}
            content={"Are you sure you want to delete this todo?"}
            title={"Delete Todo"}
            onSubmit={handleDelete}
          />
        )}
      </CardBody>
    </Card>
  );
}
