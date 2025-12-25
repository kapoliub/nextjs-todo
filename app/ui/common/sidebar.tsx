import { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

export default async function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="w-[30%] border-r border-divider bg-primary-50 p-4 h-[calc(100vh-65px)] overflow-y-auto">
      <div className="flex flex-col">{children}</div>
    </aside>
  );
}
