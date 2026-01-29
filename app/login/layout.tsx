import { Suspense } from "react";

import { OneTapComponent } from "@/app/ui/auth";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function SignupLayout({ children }: LayoutProps) {
  return (
    <Suspense fallback={"Loading..."}>
      <div>{children}</div>
      <OneTapComponent />
    </Suspense>
  );
}
