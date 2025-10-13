import { Button } from "@heroui/button";
import Link from "next/link";

export default function CheckYourEmail() {
  return (
    <div className="flex flex-col gap-4">
      <h3>Check your email for confirmation link</h3>
      <Button as={Link} href="/">
        Go to Home
      </Button>
    </div>
  );
}
