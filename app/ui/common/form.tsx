"use client";

import { Button } from "@heroui/button";
import {
  FormEvent,
  FormHTMLAttributes,
  ReactNode,
  startTransition,
  useEffect,
} from "react";

import { PlusIcon } from "@/app/ui/icons";
import { addErrorToast } from "@/lib/utils/toast";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  action: (formData: FormData) => void;
  submitButtonLabel?: string;
  children: ReactNode | ReactNode[];
  loading: boolean;
  formError?: string[];
  skipFormReset?: boolean;
}

export default function Form({
  action,
  submitButtonLabel,
  children,
  loading,
  formError,
  skipFormReset = false,
  ...rest
}: FormProps) {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    if (!skipFormReset) {
      form.reset();
    }

    startTransition(() => {
      action(formData);
    });
  };

  useEffect(() => {
    if (formError) {
      addErrorToast(formError[0]);
    }
  }, [formError]);

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit} {...rest}>
      {children}
      {submitButtonLabel ? (
        <Button isDisabled={loading} isLoading={loading} type="submit">
          {submitButtonLabel}
        </Button>
      ) : (
        <Button
          isIconOnly
          //   className={`ml-1 ${isButtonDisabled && "cursor-not-allowed"}`}
          color="success"
          disabled={loading}
          isLoading={loading}
          type="submit"
        >
          <PlusIcon />
        </Button>
      )}
    </form>
  );
}
