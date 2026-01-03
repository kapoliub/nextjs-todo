import { ReactNode } from "react";

interface ChildrenLayoutProps {
  children: ReactNode;
  padding?: number;
}

export default async function ChildrenLayout({
  children,
  padding = 4,
}: ChildrenLayoutProps) {
  return <main className={`flex-1 p-${padding}`}>{children}</main>;
}
