import AddItemInput from "../ui/list/input";
import { ListItem } from "../ui/list/list-item";

import { getUser } from "@/lib/actions/auth";
import { getUserLists } from "@/lib/actions/lists";

export default async function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const { data } = await getUserLists();

  return (
    <div className="flex h-full w-full">
      <aside className="w-64 border-r p-4">
        <AddItemInput isLoggedIn={!!user} type="list" />
        <ul>
          {data?.map((item) => (
            <ListItem key={item.id} todosCount={item.todos_count} {...item} />
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
