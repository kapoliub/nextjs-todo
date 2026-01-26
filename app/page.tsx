import { redirect } from "next/navigation";

import { TodoList } from "@/app/ui/homepage";
import { getUser } from "@/lib/actions/auth";
import { PATHS } from "@/lib/paths";

export default async function Home() {
  const user = await getUser();

  if (user) {
    redirect(PATHS.todos());
  }

  return (
    <div className="flex flex-col h-full items-center w-full">
      <TodoList />
    </div>
  );
}
