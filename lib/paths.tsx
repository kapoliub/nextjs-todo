export const PATHS = {
  login: "/login",
  signup: "/signup",
  welcome: "/welcome",
  dashboard: "/dashboard",
  profile: "/profile",
  checkYourEmail: (email: string) => `/check-your-email?email=${email}`,
  todos: (listId?: string) => `/todos${listId ? `/${listId}` : ""}`,
};

export const PAGE_NAMES = {
  [PATHS.login]: "Login",
  [PATHS.signup]: "Sign up",
  [PATHS.welcome]: "Welcome",
  ["/check-your-email"]: "Check your email",
  ["/todos"]: "Todos",
  [PATHS.dashboard]: "Dashboard",
  [PATHS.profile]: "Profile",
  ["/"]: "Todos",
};
