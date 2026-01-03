import { ChildrenLayout } from "@/app/ui/common";
import { AddItemInput, ListItem, SidebarTitle } from "@/app/ui/list";
import { Sidebar } from "@/app/ui/layout";
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
      <Sidebar
        title={<SidebarTitle count={data?.length} text="Lists" />}
        topContent={<AddItemInput type="list" />}
      >
        <div className="flex flex-col gap-2">
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
      <ChildrenLayout>{children}</ChildrenLayout>
    </div>
  );
}
