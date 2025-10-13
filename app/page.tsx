import { Button } from "@heroui/button";

import { deleteUser, getUser } from "@/auth";
import Link from "next/link";

export default async function Home() {
  return (
    <section>
      {/* <Button onPress={deleteUser}>deleteUser</Button> */}
      <Button as={Link} href="/dashboard">
        Go to dashboard
      </Button>
    </section>
  );
}
