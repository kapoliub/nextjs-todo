import { AddItemInput } from "@/app/ui/list";

export default async function TodosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full w-full">
      <AddItemInput type="todo" />
      {children}
    </div>
  );
}
