import { redirect } from "next/navigation";

import { getUser } from "@/lib/actions/auth";
import TodoList from "@/app/ui/todo/list";
import { PATHS } from "@/lib/paths";

export default async function Home() {
  const user = await getUser();

  if (user) {
    redirect(PATHS.todos);
  }

  return (
    <section>
      <TodoList />
    </section>
  );
}
