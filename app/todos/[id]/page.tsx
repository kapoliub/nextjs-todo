import { redirect } from "next/navigation";

import { getListTodos } from "@/lib/actions/todos";
import { PATHS } from "@/lib/paths";
import AddItemInput from "@/app/ui/list/input";
import TodoItem from "@/app/ui/todo/item";

// app/items/[id]/page.tsx
export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: todos } = await getListTodos(id);

  if (!todos) {
    redirect(PATHS.todos);
  }

  return (
    <div>
      <AddItemInput type="todo" />
      {todos.length === 0 && (
        <p className="mt-4">No todos in this list yet. Add your first todo!</p>
      )}
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
}
