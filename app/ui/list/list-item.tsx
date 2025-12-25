"use client";
import { Card, CardBody } from "@heroui/card";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { addToast } from "@heroui/toast";

import EditableText from "../common/editable-text";

import ButtonsContainer from "./button-container";
import Chips from "./chips";

import { PATHS } from "@/lib/paths";
import { updateList } from "@/lib/actions/lists";
import { useClickOutside } from "@/lib/hooks/use-outside-click";
import { TodosCount } from "@/types";

interface ListItemProps {
  id: string;
  title: string;
  todosCount: TodosCount;
}

export default function ListItem({ id, title, todosCount }: ListItemProps) {
  const { id: listId } = useParams();
  const { push } = useRouter();
  const [itemTitle, setItemTitle] = useState(title);
  const [isEditable, setIsEditable] = useState(false);

  const isSelected = listId === id;

  const onListClick = () => {
    if (isEditable || isSelected) return;
    push(`${PATHS.todos}/${id}`);
  };

  const onEditSubmit = async () => {
    const formattedValue = itemTitle.trim().replace(/[^\S\n]+/g, " ");

    if (formattedValue && formattedValue !== title) {
      const { message } = await updateList({ title: formattedValue, id });

      if (message) {
        addToast({
          title: "Error",
          color: "danger",
          description: message,
        });

        return;
      }
    }
    setIsEditable(false);
  };

  const handleCancelEdit = () => {
    setIsEditable(false);
    setItemTitle(title);
  };

  const editableRef = useClickOutside(handleCancelEdit);

  return (
    <Card
      className={`${!isSelected && "opacity-80 hover:opacity-100"} cursor-pointer`}
      isBlurred={!isSelected}
    >
      <CardBody className="p-1 pl-0 flex flex-row justify-between align-center">
        <div
          className="flex flex-1 items-center"
          role="presentation"
          onClick={onListClick}
        >
          <Chips todosCount={todosCount} />
          <EditableText
            excludeRef={editableRef}
            isActive={isEditable}
            value={itemTitle}
            onInputChange={setItemTitle}
          >
            <div className="flex-1 m-auto">{itemTitle}</div>
          </EditableText>
        </div>
        <ButtonsContainer
          excludeRef={editableRef}
          isEditable={isEditable}
          itemId={id}
          onEditButtonClick={() => setIsEditable(true)}
          onEditSubmit={onEditSubmit}
        />
      </CardBody>
    </Card>
  );
}
