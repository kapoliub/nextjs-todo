"use client";

import { ChangeEvent, ReactNode, useEffect, useRef } from "react";
import { Textarea } from "@heroui/input";
import { RefObject } from "react";

interface EditableTextProps {
  children: ReactNode;
  isActive: boolean;
  excludeRef: RefObject<any>;
  value: string;
  onInputChange: (value: string) => void;
}

export default function EditableText({
  children,
  value,
  isActive,
  excludeRef,
  onInputChange,
}: EditableTextProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onInputChange(e.target.value);
  };

  useEffect(() => {
    const input = inputRef.current?.querySelector("textarea");

    if (isActive && input) {
      const timeoutId = setTimeout(() => {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [isActive]);

  return isActive ? (
    <Textarea
      ref={excludeRef}
      baseRef={inputRef}
      classNames={{
        base: "px-1 pb-1",
        input: "text-base",
        innerWrapper: "flex items-center",
      }}
      minRows={1}
      value={value}
      variant="underlined"
      onChange={handleInputChange}
    />
  ) : (
    <div
      ref={excludeRef}
      className="flex-1 m-auto mx-2 my-2 border-b-2 border-transparent"
    >
      {children}
    </div>
  );
}
