"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { RefObject, useState } from "react";
import { Checkbox } from "@heroui/checkbox";
import { useParams } from "next/navigation";
import { Check } from "lucide-react";

import { EditableText, ButtonWithModal } from "@/app/ui/common";
import { deleteTodo, editTodo } from "@/lib/actions/todos";
import { StoredTodo } from "@/lib/utils/local-storage";
import { useClickOutside } from "@/lib/hooks/use-outside-click";
import { addErrorToast, addSuccessToast } from "@/lib/utils/toast";

interface TodoItemProps extends StoredTodo {
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
  const [isChecked, setIsChecked] = useState(!!todoProps.is_completed);
  const [isLoading, setIsLoading] = useState(false);

  const { listId } = useParams();

  const handleEdit = () => {
    if (isChecked || isLoading) return;
    setIsEditable(true);
  };

  const handleSave = async () => {
    setIsEditable(false);

    if (inputValue.trim() !== title) {
      const formattedValue = inputValue.trim().replace(/[^\S\n]+/g, " ");

      setInputValue(formattedValue);
      setIsLoading(true);
      await editTodo({ id, title: formattedValue }, listId as string);
      onEdit?.({ ...todoProps, id, title: formattedValue });
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    //TODO: fix deleting for non authenticated users
    if (onDelete) {
      onDelete(id);
    } else {
      const response = await deleteTodo(id, listId as string);

      if (response?.error) {
        addErrorToast(response?.error);
      } else {
        addSuccessToast("The todo has been removed");
      }
    }
    setIsLoading(false);
  };

  const handleCancelEdit = () => {
    setIsEditable(false);
    setInputValue(title);
  };

  const handleCheckboxChange = async (value: boolean) => {
    setIsChecked(value);
    setIsLoading(true);
    await editTodo({ id, is_completed: value }, listId as string);
    onEdit?.({ ...todoProps, id, title, is_completed: value });
    setIsLoading(false);
  };

  const editableRef = useClickOutside(handleCancelEdit);

  return (
    <Card className="my-2 mx-4">
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
        <EditableText
          excludeRef={editableRef as RefObject<HTMLDivElement>}
          isActive={isEditable}
          value={inputValue}
          onInputChange={setInputValue}
        >
          <div
            className={`${isChecked ? "cursor-not-allowed" : "cursor-text"}`}
            role="presentation"
            onClick={handleEdit}
          >
            <p className="whitespace-pre-line text-6">{inputValue}</p>
          </div>
        </EditableText>
        {isEditable ? (
          <Button
            ref={editableRef as RefObject<HTMLButtonElement>}
            isIconOnly
            color="primary"
            disabled={isLoading}
            onPress={handleSave}
          >
            <Check size={16} />
          </Button>
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
