"use client";

import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

import { signOut } from "@/lib/actions/auth";

interface User {
  email: string;
}

const dropdownItems = [
  { label: "Profile", href: "/profile", type: "link" },
  { label: "Logout", type: "button", action: signOut },
];

export default function AvatarDropdown({ email }: User) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" color="primary" name={email} />
      </DropdownTrigger>
      {/* <ThemeSwitcher /> */}

      <DropdownMenu aria-label="Dynamic Actions" items={dropdownItems}>
        {({ label, href, type, action }) => (
          <DropdownItem
            key={label}
            href={type === "link" ? href : undefined}
            onPress={type === "button" ? action : undefined}
            // className={item.key === "delete" ? "text-danger" : ""}
            // color={item.key === "delete" ? "danger" : "default"}
          >
            {label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
