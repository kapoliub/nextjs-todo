import { PasswordForm, PersonalInfoForm } from "@/app/ui/profile";
import { getUser } from "@/lib/actions/auth";

export default async function Profile() {
  const user = await getUser();

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-12">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold tracking-tight">
            Personal Information
          </h2>
          <p className="text-default-500 text-sm mt-1">
            Update your email and contact details.
          </p>
        </div>
        <div className="md:col-span-2">
          <PersonalInfoForm email={user?.email} phone={user?.phone} />
        </div>
      </section>
      <div className="h-px bg-default-200/50 w-full" />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold tracking-tight">Security</h2>
          <p className="text-default-500 text-sm mt-1">
            Keep your account secure with a strong password.
          </p>
        </div>
        <div className="md:col-span-2">
          <PasswordForm />
        </div>
      </section>
    </div>
  );
}
