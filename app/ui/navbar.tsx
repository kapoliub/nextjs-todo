import {
  Navbar as HeroNavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";

import AuthButton from "./navbar/auth-button";
import AvatarDropdown from "./navbar/avatar-dropdown";

import ThemeSwitcher from "@/app/ui/theme-switcher";
import { getUser } from "@/auth";

export default async function Navbar() {
  const user = await getUser();

  return (
    <HeroNavbar isBordered maxWidth="full" position="static">
      <NavbarContent className="navbar" justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          {user ? <AvatarDropdown email={user.email!} /> : <AuthButton />}
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
}
