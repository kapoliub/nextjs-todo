import React from "react";
import { SearchX, ArrowLeftCircle } from "lucide-react";
import { Card, CardBody } from "@heroui/card";

export default function ListNotFoundState() {
  return (
    <div className="flex h-full w-full items-center justify-center px-4 py-20 -mt-16">
      <Card className="max-w-[400px] border-none bg-transparent shadow-none overflow-visible">
        <CardBody className="flex flex-col items-center gap-6 text-center overflow-visible">
          <div className="relative">
            <SearchX className="text-default-300" size={100} strokeWidth={1} />
            <div className="absolute -left-14 top-1/2 -translate-y-1/2 animate-bounce-left z-50 hidden md:block">
              <ArrowLeftCircle
                className="text-primary fill-background shadow-xl rounded-full"
                size={44}
                strokeWidth={2.5}
              />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              List not found
            </h2>
            <p className="text-default-500">
              The list you&apos;re looking for doesn&apos;t exist or has been
              moved. Try selecting a different one from the sidebar.
            </p>
          </div>
          {/* <Button
            as={Link}
            color="primary"
            href="/dashboard"
            startContent={<Home size={18} />}
            variant="flat"
          >
            Back to Dashboard
          </Button> */}
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-primary/20" />
            <div className="h-2 w-2 rounded-full bg-primary/20" />
            <div className="h-2 w-8 rounded-full bg-primary/20" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
