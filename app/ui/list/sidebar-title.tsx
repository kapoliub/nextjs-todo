import { Chip } from "@heroui/chip";

interface SidebarTitleProps {
  count?: number;
  text: string;
}

export default async function SidebarTitle({
  text,
  count = 0,
}: SidebarTitleProps) {
  return (
    <div className="flex gap-2">
      <h2 className="text-xl font-bold">{text}</h2>
      <Chip className="w-32px " color="primary" radius="md" variant="flat">
        {count}
      </Chip>
    </div>
  );
}
