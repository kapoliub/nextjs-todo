import { LoginForm } from "@/app/ui/auth";

export default async function LoginPage() {
  return (
    <div className="h-full max-w-screen w-100 flex items-center justify-center -mt-40">
      <LoginForm />
    </div>
  );
}
