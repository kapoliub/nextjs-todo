import { Card, CardBody } from "@heroui/card";
import { ArrowLeftCircle, ListChecks } from "lucide-react";

export default function TodoListPlaceholder() {
  return (
    <div className="flex h-[80vh] w-full items-center justify-center p-4">
      <Card className="max-w-[400px] border-none bg-transparent shadow-none">
        <CardBody className="flex flex-col items-center gap-6 text-center">
          <div className="relative">
            <ListChecks
              className="text-default-300"
              size={100}
              strokeWidth={1}
            />
            <div className="absolute -left-12 top-1/2 animate-bounce">
              <ArrowLeftCircle className="text-primary" size={40} />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">No List Selected</h2>
            <p className="text-default-500">
              Pick a list from the sidebar to view your todos and stay
              productive.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="h-2 w-8 rounded-full bg-primary/20" />
            <div className="h-2 w-2 rounded-full bg-primary/20" />
            <div className="h-2 w-2 rounded-full bg-primary/20" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
