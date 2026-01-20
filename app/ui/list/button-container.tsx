"use client";
import { redirect, useParams } from "next/navigation";
import { Button } from "@heroui/button";
import { RefObject, useState } from "react";

import { ButtonWithModal } from "@/app/ui/common";
import { CheckIcon, EditIcon } from "@/app/ui/icons";
import { deleteList } from "@/lib/actions/lists";
import { PATHS } from "@/lib/paths";
import { addSuccessToast } from "@/lib/utils/toast";

interface ButtonsContainerProps {
  itemId: string;
  isEditable: boolean;
  excludeRef: RefObject<any>;
  disableSubmit: boolean;
  onEditButtonClick: () => void;
  onEditSubmit: () => Promise<void>;
}

export default function ButtonsContainer({
  itemId,
  isEditable,
  excludeRef,
  disableSubmit,
  onEditSubmit,
  onEditButtonClick,
}: ButtonsContainerProps) {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteSubmit = async () => {
    setIsLoading(true);
    await deleteList(itemId, itemId === params.id);

    if (itemId === params.id) {
      redirect(PATHS.todos);
    }
    setIsLoading(false);
    addSuccessToast("The list has been deleted");
  };

  const handleEditSubmit = async () => {
    setIsLoading(true);
    await onEditSubmit();
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-1 items-center">
      <Button
        ref={excludeRef}
        isIconOnly
        className={`min-h-8 flex-1 ${disableSubmit && "cursor-not-allowed"}`}
        color="primary"
        disabled={disableSubmit}
        id="edit-list-button"
        isLoading={isLoading}
        radius="md"
        size="sm"
        onPress={isEditable ? handleEditSubmit : onEditButtonClick}
      >
        {isEditable ? <CheckIcon /> : <EditIcon />}
      </Button>
      <ButtonWithModal
        buttonProps={{
          className: "min-h-8 flex-1",
          isLoading: isLoading,
          color: "danger",
          radius: "md",
          size: "sm",
        }}
        content="Are you sure you want to delete this list?"
        title="Delete List"
        onSubmit={handleDeleteSubmit}
      />
    </div>
  );
}
