import {
  Navbar as HeroNavbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
} from "@heroui/navbar";

import { AvatarDropdown, HomepageButton, AuthButtons } from "@/app/ui/navbar";
import ThemeSwitcher from "@/app/ui/theme-switcher";
import { getUser } from "@/lib/actions/auth";

export default async function Navbar() {
  const user = await getUser();

  return (
    <HeroNavbar
      isBordered
      className="bg-primary-100/80 backdrop-blur-xl border-b border-default-100/50"
      maxWidth="full"
      position="sticky"
    >
      <NavbarBrand className="gap-4">
        <HomepageButton isLoggedIn={!!user} />
      </NavbarBrand>
      <NavbarContent className="gap-5" justify="end">
        {!user && (
          <NavbarItem className="flex items-center">
            <ThemeSwitcher />
          </NavbarItem>
        )}
        <NavbarItem>
          <div className="flex items-center p-1 rounded-2xl bg-default-100/40 dark:bg-default-50/10 border border-default-200/50 backdrop-blur-xl shadow-sm transition-all hover:bg-default-100/60">
            {user ? (
              <div className="flex items-center gap-1">
                <div className="px-1 pl-1">
                  <ThemeSwitcher />
                </div>
                <div className="h-4 w-px bg-default-300/50 mx-1" />
                <div className="pl-1 pr-2">
                  <AvatarDropdown
                    name={user.user_metadata.full_name ?? user.email}
                  />
                </div>
              </div>
            ) : (
              <AuthButtons />
            )}
          </div>
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
}
