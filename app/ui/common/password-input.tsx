"use client";

import React, { useState } from "react";
import { Input, InputProps } from "@heroui/input";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput(props: InputProps) {
  const [isVisible, setIsVisible] = useState(false);
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
            <Eye className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeOff className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      {...props}
      type={isVisible ? "text" : "password"}
    />
  );
}
