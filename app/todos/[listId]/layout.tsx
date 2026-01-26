import { AddTodoInput } from "@/app/ui/todo";

export default async function TodosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full w-full min-h-0">
      {/* Sticky input */}
      <div className="sticky top-0 z-10 bg-primary-50 p-4">
        <AddTodoInput />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar">
        {children}
      </div>
    </div>
  );
}
