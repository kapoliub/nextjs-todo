export const PATHS = {
  login: "/login",
  signup: "/signup",
  welcome: "/welcome",
  checkYourEmail: "/check-your-email",
  todos: "/todos",
  dashboard: "/dashboard",
  profile: "/profile",
};

export const PAGE_NAMES: Record<(typeof PATHS)[keyof typeof PATHS], string> = {
  [PATHS.login]: "Login",
  [PATHS.signup]: "Sign up",
  [PATHS.welcome]: "Welcome",
  [PATHS.checkYourEmail]: "Check your email",
  [PATHS.todos]: "Todos",
  [PATHS.dashboard]: "Dashboard",
  [PATHS.profile]: "Profile",
};
