"use client";
import { Button } from "@heroui/button";
import { NavbarItem } from "@heroui/navbar";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getPath } from "@/lib/utils/url-parsers";
import { PAGE_NAMES, PATHS } from "@/lib/paths";

interface HomepageButtonProps {
  isLoggedIn: boolean;
}

export default function HomepageButton({ isLoggedIn }: HomepageButtonProps) {
  const path = usePathname();
  const pageName = PAGE_NAMES[getPath(path)] ?? "App";
  const isAtRoot = path === "/" || path === PATHS.todos();

  return (
    <NavbarItem className="flex items-center gap-3 select-none">
      {!isAtRoot ? (
        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-400">
          <Button
            isIconOnly
            as={Link}
            className="bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all"
            href={isLoggedIn ? PATHS.todos() : "/"}
            radius="lg"
            size="sm"
            variant="flat"
          >
            <Home size={16} strokeWidth={2.5} />
          </Button>
          <div className="flex flex-col ml-1">
            <div className="flex items-center gap-2">
              <span className="text-default-300 font-light">/</span>
              <h1 className="text-xl font-extrabold tracking-tight text-default-900 leading-none">
                {pageName}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="h-6 w-1.5 rounded-full bg-gradient-to-b from-primary to-primary-400 opacity-90 shadow-[0_0_10px_rgba(var(--heroui-primary-rgb),0.3)]" />

          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-extrabold tracking-tight text-default-900 leading-none">
              {pageName}
            </h1>
          </div>
        </div>
      )}
    </NavbarItem>
  );
}
