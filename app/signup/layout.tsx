import { Suspense } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function SignupLayout({ children }: LayoutProps) {
  return (
    <Suspense fallback={"Loading..."}>
      <div>{children}</div>
    </Suspense>
  );
}
