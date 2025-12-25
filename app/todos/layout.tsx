import AddItemInput from "../ui/list/input";
import Sidebar from "../ui/common/sidebar";

import ListItem from "@/app/ui/list/list-item";
import { getUserLists } from "@/lib/actions/lists";
import { TodosCount } from "@/types";

export default async function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUserLists();

  return (
    <div className="flex w-full h-full">
      <Sidebar>
        <div className="flex flex-col gap-2">
          <AddItemInput type="list" />
          {data?.map((item) => (
            <ListItem
              key={item.id}
              // TODO: fix type casting
              todosCount={item.todos_count as unknown as TodosCount}
              {...item}
            />
          ))}
        </div>
      </Sidebar>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
