import { Card, CardBody } from "@heroui/card";
import { Kbd } from "@heroui/kbd";
import { ArrowUpCircle, ListPlus } from "lucide-react";

export default function EmptyTodoList() {
  return (
    <div className="flex w-full items-center justify-center px-4 py-20 mt-20">
      <Card className="max-w-[400px] border-none bg-transparent shadow-none overflow-visible">
        <CardBody className="flex flex-col items-center gap-6 text-center overflow-visible">
          <div className="relative">
            <ListPlus className="text-default-300" size={100} strokeWidth={1} />
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce z-50">
              <ArrowUpCircle
                className="text-primary fill-background shadow-xl rounded-full"
                size={44}
                strokeWidth={2.5}
              />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Your list is empty
            </h2>
            <p className="text-default-500">
              Ready to get things done? <br />
              Add a todo in the field above and press
              <Kbd className="ml-2 py-0.5" keys={["enter"]} />
            </p>
          </div>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-primary/20" />
            <div className="h-2 w-8 rounded-full bg-primary/20" />
            <div className="h-2 w-2 rounded-full bg-primary/20" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
