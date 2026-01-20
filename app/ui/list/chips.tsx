import { Chip, ChipProps } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";

import { TodosCount } from "@/types";

interface ChipsProps {
  todosCount: TodosCount;
}

type ComponentProps = {
  color: ChipProps["color"];
  tooltipText: string;
};

const availableProps: Record<keyof TodosCount, ComponentProps> = {
  total: {
    color: "default",
    tooltipText: "Total todos",
  },
  completed: {
    color: "success",
    tooltipText: "Completed todos",
  },
};

export default function Chips({ todosCount }: ChipsProps) {
  return (
    <div className="flex flex-col justify-between gap-1 h-full pl-1">
      {Object.entries(todosCount).map(([key, value]) => {
        const { color, tooltipText } = availableProps[key as keyof TodosCount];

        return (
          <Tooltip
            key={key}
            closeDelay={0}
            color="foreground"
            content={tooltipText}
            placement="right"
          >
            <Chip
              className="w-32px text-center max-w-none flex-1"
              color={color}
              radius="md"
              variant="flat"
            >
              {value}
            </Chip>
          </Tooltip>
        );
      })}
    </div>
  );
}
