"use client";
import { redirect, useParams } from "next/navigation";

import ButtonWithModal from "../common/button-with-modal";

import { deleteList } from "@/lib/actions/lists";
import { PATHS } from "@/lib/paths";

interface DeleteListButtonProps {
  itemId: string;
}

export default function DeleteListButton({ itemId }: DeleteListButtonProps) {
  const params = useParams();

  const handleSubmitClick = async () => {
    await deleteList(itemId, itemId === params.id);

    if (itemId === params.id) {
      redirect(PATHS.todos);
    }
  };

  return (
    <ButtonWithModal
      buttonProps={{
        color: "danger",
        radius: "md",
        size: "sm",
      }}
      content="Are you sure you want to delete this list?"
      title="Delete List"
      onSubmit={handleSubmitClick}
    />
  );
}
