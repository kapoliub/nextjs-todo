import {
  Navbar as HeroNavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";

import AuthButton from "./auth-button";
import AvatarDropdown from "./avatar-dropdown";
import HomepageButton from "./homepage-button";

import ThemeSwitcher from "@/app/ui/theme-switcher";
import { getUser } from "@/lib/actions/auth";

export default async function Navbar() {
  const user = await getUser();

  return (
    <HeroNavbar
      isBordered
      className="bg-primary-100"
      maxWidth="full"
      position="static"
    >
      <NavbarContent className="navbar flex justify-between!">
        <HomepageButton hidden={!user} />
        <div className="flex items-center gap-4 justify-end ml-auto">
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          <NavbarItem>
            {user ? (
              <AvatarDropdown
                name={user.user_metadata.full_name ?? user.email}
              />
            ) : (
              <AuthButton />
            )}
          </NavbarItem>
        </div>
      </NavbarContent>
    </HeroNavbar>
  );
}
