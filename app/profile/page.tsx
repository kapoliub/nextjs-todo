import { getUser } from "@/lib/actions/auth";

export default async function Profile() {
  const user = await getUser();

  return <div className="flex flex-col gap-4">Profile page</div>;
}
