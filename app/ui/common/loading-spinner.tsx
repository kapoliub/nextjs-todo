import { Card, CardBody } from "@heroui/card";
import { Spinner } from "@heroui/spinner";
import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-background/60 backdrop-blur-md">
      <Card className="max-w-[300px] border-none bg-transparent shadow-none">
        <CardBody className="flex flex-col items-center gap-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-16 w-16 animate-pulse rounded-full bg-primary/20 blur-2xl" />
            <Spinner
              classNames={{
                wrapper: "h-20 w-20",
                circle1: "border-b-primary border-3",
                circle2: "border-b-primary/30 border-3",
              }}
              color="primary"
              labelColor="primary"
              size="lg"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-default-700 animate-pulse">
              Preparing your tasks...
            </h3>
            <div className="flex gap-1.5">
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:-0.3s]" />
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:-0.15s]" />
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40" />
            </div>
          </div>
          <div className="flex gap-2 mt-2 opacity-50">
            <div className="h-1 w-6 rounded-full bg-primary/20" />
            <div className="h-1 w-1 rounded-full bg-primary/20" />
            <div className="h-1 w-1 rounded-full bg-primary/20" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
