"use client";
import { Button, ButtonProps } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { ReactNode, useState } from "react";

import { TrashIcon } from "../icons";

interface ButtonWithModalProps {
  onSubmit: () => Promise<void>;
  buttonProps?: ButtonProps;
  title: ReactNode;
  content: ReactNode;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

export default function ButtonWithModal({
  onSubmit,
  buttonProps,
  title,
  content,
  cancelButtonText = "Cancel",
  confirmButtonText = "Delete",
}: ButtonWithModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmitClick = async (onClose: () => void) => {
    setIsLoading(true);
    await onSubmit();
    onClose();
    setIsLoading(false);
  };

  return (
    <>
      <Button
        isIconOnly
        disabled={isLoading}
        isLoading={isLoading}
        onPress={onOpen}
        {...buttonProps}
      >
        <TrashIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{content}</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  disabled={isLoading}
                  variant="light"
                  onPress={onClose}
                >
                  {cancelButtonText}
                </Button>
                <Button
                  color="primary"
                  isLoading={isLoading}
                  onPress={() => handleSubmitClick(onClose)}
                >
                  {confirmButtonText}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
