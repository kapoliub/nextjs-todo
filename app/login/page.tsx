import { AuthForm } from "@/app/ui/auth";
import { loginUser } from "@/lib/actions/auth";

export default function SignupPage() {
  return <AuthForm type="login" onSubmit={loginUser} />;
}
