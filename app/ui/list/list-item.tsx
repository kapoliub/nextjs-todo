"use client";
import { Card, CardBody } from "@heroui/card";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { ButtonsContainer, Chips } from "@/app/ui/list";
import { PATHS } from "@/lib/paths";
import { updateList } from "@/lib/actions/lists";
import { useClickOutside } from "@/lib/hooks/use-outside-click";
import { TodosCount } from "@/types";
import { EditableText } from "@/app/ui/common";
import { addErrorToast, addSuccessToast } from "@/lib/utils/toast";

interface ListItemProps {
  id: string;
  title: string;
  todosCount: TodosCount;
}

export default function ListItem({ id, title, todosCount }: ListItemProps) {
  const { listId } = useParams();
  const { push } = useRouter();
  const [itemTitle, setItemTitle] = useState(title);
  const [isEditable, setIsEditable] = useState(false);

  const isSelected = listId === id;

  const onListClick = () => {
    if (isEditable || isSelected) return;
    push(PATHS.todos(id));
  };

  const onEditSubmit = async () => {
    const formattedValue = itemTitle.trim().replace(/[^\S\n]+/g, " ");

    setItemTitle(formattedValue);

    if (formattedValue && formattedValue !== title) {
      const { message } = await updateList({ title: formattedValue, id });

      if (message) {
        addErrorToast(message);

        return;
      }
      addSuccessToast("The title has been changed");
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
      className={`${!isSelected && "opacity-75 hover:opacity-100"} cursor-pointer`}
      isBlurred={!isSelected}
    >
      <CardBody className="p-1 pl-0 flex flex-row justify-between align-center">
        <div
          className="flex flex-1 items-center overflow-hidden"
          role="presentation"
          onClick={onListClick}
        >
          <Chips todosCount={todosCount} />
          <EditableText
            excludeRef={editableRef}
            isActive={isEditable}
            maxLength={84}
            value={itemTitle}
            onInputChange={setItemTitle}
          >
            <div className="flex-1 m-auto">{itemTitle}</div>
          </EditableText>
        </div>
        <ButtonsContainer
          disableSubmit={!itemTitle.trim().length}
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
