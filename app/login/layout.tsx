import { Suspense } from "react";

import { OneTapComponent } from "@/app/ui/auth";
import { LoadingSpinner } from "@/app/ui/common";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function SignupLayout({ children }: LayoutProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
      <OneTapComponent />
    </Suspense>
  );
}
