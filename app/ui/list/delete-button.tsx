"use client";
import { Button } from "@heroui/button";

import { TrashIcon } from "../icons";

import { deleteList } from "@/lib/actions/lists";

interface DeleteListButtonProps {
  itemId: string;
}

export default function DeleteListButton({ itemId }: DeleteListButtonProps) {
  return (
    <Button isIconOnly color="danger" onPress={() => deleteList(itemId)}>
      <TrashIcon />
    </Button>
  );
}
