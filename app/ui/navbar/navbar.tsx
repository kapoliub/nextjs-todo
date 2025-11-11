import {
  Navbar as HeroNavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";

import AuthButton from "./auth-button";
import AvatarDropdown from "./avatar-dropdown";

import ThemeSwitcher from "@/app/ui/theme-switcher";
import { getUser } from "@/lib/actions/auth";

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
