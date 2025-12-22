import AddItemInput from "@/app/ui/list/input";

export default async function TodosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full w-full">
      <AddItemInput isLoggedIn type="todo" />
      {children}
    </div>
  );
}
