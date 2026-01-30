"use client";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  DropdownSection,
} from "@heroui/dropdown";
import { User, LogOut, Settings } from "lucide-react";

import { signOut } from "@/lib/actions/auth";

export default function AvatarDropdown({ name }: { name: string }) {
  return (
    <Dropdown
      backdrop="blur"
      classNames={{ content: "border-small border-default-100 bg-background" }}
      placement="bottom-end"
    >
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          color="primary"
          name={name.substring(0, 2).toUpperCase()}
          size="sm"
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownSection showDivider aria-label="Profile & Settings">
          <DropdownItem
            key="profile"
            description="View your personal info"
            href="/profile"
            startContent={<User size={16} />}
          >
            My Profile
          </DropdownItem>
          <DropdownItem key="settings" startContent={<Settings size={16} />}>
            Account Settings
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Exit">
          <DropdownItem
            key="logout"
            className="text-danger"
            color="danger"
            startContent={<LogOut size={16} />}
            onPress={() => signOut()}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
