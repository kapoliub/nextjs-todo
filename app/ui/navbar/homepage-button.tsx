"use client";
import Link from "next/dist/client/link";
import { Button } from "@heroui/button";
import { usePathname } from "next/navigation";
import { NavbarItem } from "@heroui/navbar";

import { PAGE_NAMES, PATHS } from "@/lib/paths";
import { getPath } from "@/lib/utils/url-parsers";

interface HomepageButtonProps {
  hidden?: boolean;
}

export default function HomepageButton({ hidden }: HomepageButtonProps) {
  const path = usePathname();
  const rootPath = getPath(path);

  const pageName = PAGE_NAMES[rootPath] ?? "";

  const showButton = !hidden && !path.includes(PATHS.todos);

  return (
    <NavbarItem className="flex items-center gap-4">
      <h1 className="text-2xl/7 font-bold">{pageName}</h1>
      {showButton && (
        <Button as={Link} color="primary" href={PATHS.todos}>
          Homepage
        </Button>
      )}
    </NavbarItem>
  );
}
