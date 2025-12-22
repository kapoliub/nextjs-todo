import { Chip } from "@heroui/chip";
import { Card, CardBody } from "@heroui/card";
import Link from "next/link";

import DeleteListButton from "./delete-button";

import { PATHS } from "@/lib/paths";

interface ListItemProps {
  id: string;
  title: string;
  todosCount: number;
}

export async function ListItem({ id, title, todosCount }: ListItemProps) {
  return (
    <li>
      <Card className="my-2">
        <CardBody className="p-1 pl-0 flex flex-row justify-between align-center">
          <Link
            className="flex flex-1 align-center"
            href={`${PATHS.todos}/${id}`}
          >
            <Chip
              className="p-0 mr-1 -my-1 h-10"
              color="danger"
              radius="md"
              size="md"
              variant="flat"
            >
              {todosCount}
            </Chip>
            <div className="flex-1 m-auto">{title}</div>
          </Link>
          <DeleteListButton itemId={id} />
        </CardBody>
      </Card>
    </li>
  );
}
