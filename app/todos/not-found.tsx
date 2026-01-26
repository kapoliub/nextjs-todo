import { Button } from "@heroui/button";
import Link from "next/link";

import { PATHS } from "@/lib/paths";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>404</h1>
      <h3>Todo was not found</h3>
      <Button as={Link} href={PATHS.todos()}>
        Go to Home
      </Button>
    </div>
  );
}
