import { Suspense } from "react";

import { LoadingSpinner } from "@/app/ui/common";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: LayoutProps) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}
