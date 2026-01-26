import React from "react";
import { Input, InputProps } from "@heroui/input";

import { EyeSlashFilledIcon, EyeFilledIcon } from "@/app/ui/icons";

export default function PasswordInput(props: InputProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-solid outline-transparent"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      {...props}
      type={isVisible ? "text" : "password"}
    />
  );
}
