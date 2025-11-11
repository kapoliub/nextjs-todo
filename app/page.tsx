import { redirect } from "next/navigation";

import { getUser } from "@/lib/actions/auth";
import { PATHS } from "@/lib/paths";

export default async function Home() {
  const user = await getUser();

  if (user) {
    redirect(PATHS.todos);
  }

  return <section>{/* <TodoList /> */}</section>;
}
