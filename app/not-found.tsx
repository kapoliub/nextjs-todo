import { Button } from "@heroui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>404 - Page Not Found</h1>
      <Button as={Link} href="/">
        Go to Home
      </Button>
    </div>
  );
}
