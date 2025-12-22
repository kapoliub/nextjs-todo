import { Button } from "@heroui/button";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex flex-col gap-5">
      <h3>Ooooops.... Something went wrong</h3>
      <span>Try again</span>
      <Button as={Link} href="/">
        Go home
      </Button>
    </div>
  );
}
