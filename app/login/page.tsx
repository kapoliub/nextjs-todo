import LoginForm from "@/app/ui/auth/form";
import { loginUser } from "@/auth";

export default function SignupPage() {
  return <LoginForm type="login" onSubmit={loginUser} />;
}
