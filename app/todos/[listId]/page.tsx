import { notFound } from "next/navigation";

import { getListTodos } from "@/lib/actions/todos";
import { EmptyTodoList, TodoItem } from "@/app/ui/todo";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ listId: string }>;
}) {
  const { listId } = await params;
  const { data: todos } = await getListTodos(listId);

  if (!todos) {
    return notFound();
  }

  return (
    <div>
      {todos.length === 0 && <EmptyTodoList />}
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
}
