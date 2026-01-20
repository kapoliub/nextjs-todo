import { AuthForm } from "@/app/ui/auth";
import { registerUser } from "@/lib/actions/auth";

export default async function SignupPage() {
  return <AuthForm type="signup" onSubmit={registerUser} />;
}
