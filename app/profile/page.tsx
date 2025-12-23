import PasswordForm from "@/app/ui/profile/password-form";
import { getUser } from "@/lib/actions/auth";
import PersonalInfoForm from "@/app/ui/profile/personal-info-form";

export default async function Profile() {
  const user = await getUser();

  return (
    <div className="flex flex-col gap-4">
      <PersonalInfoForm email={user?.email} phone={user?.phone} />
      <PasswordForm />
    </div>
  );
}
