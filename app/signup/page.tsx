import SignUpForm from "@/app/ui/auth/form";
import { registerUser } from "@/auth";

export default function SignupPage() {
  return <SignUpForm type="signup" onSubmit={registerUser} />;
}
