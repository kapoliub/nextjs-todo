"use client";

import { useTheme } from "next-themes";
import { Button } from "@heroui/button";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      isIconOnly
      className={`
        relative overflow-hidden transition-all duration-500
        hover:bg-default-100 active:scale-90
        ${isDark ? "text-indigo-400" : "text-amber-500"}
      `}
      radius="full"
      variant="light"
      onPress={() => setTheme(isDark ? "light" : "dark")}
    >
      <div
        className={`
        absolute inset-0 opacity-20 blur-lg transition-colors duration-500
        ${isDark ? "bg-indigo-500" : "bg-amber-500"}
      `}
      />
      <div className="relative z-10 flex items-center justify-center">
        {isDark ? (
          <Moon
            className="animate-in zoom-in-50 spin-in-90 duration-500"
            size={20}
            strokeWidth={2.5}
          />
        ) : (
          <Sun
            className="animate-in zoom-in-50 rotate-in-45 duration-500"
            size={20}
            strokeWidth={2.5}
          />
        )}
      </div>
    </Button>
  );
}
