"use client";
import Link from "next/dist/client/link";
import { Button } from "@heroui/button";
import { usePathname } from "next/navigation";
import { NavbarItem } from "@heroui/navbar";

import { PATHS } from "@/lib/paths";

interface HomepageButtonProps {
  hidden?: boolean;
}

export default function HomepageButton({ hidden }: HomepageButtonProps) {
  const path = usePathname();

  if (hidden || path.includes(PATHS.todos)) {
    return null;
  }

  return (
    <NavbarItem>
      <Button as={Link} href={PATHS.todos}>
        Homepage
      </Button>
    </NavbarItem>
  );
}
