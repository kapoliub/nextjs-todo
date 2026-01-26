import { redirect } from "next/navigation";

import { SignupForm } from "@/app/ui/auth";
import { getUser } from "@/lib/actions/auth";
import { PATHS } from "@/lib/paths";

export default async function SignupPage() {
  const user = await getUser();

  if (user) {
    redirect(PATHS.todos());
  }

  return (
    <div className="h-full max-w-screen w-100 flex items-center justify-center -mt-40">
      <SignupForm />
    </div>
  );
}
