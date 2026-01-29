"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Snippet } from "@heroui/snippet";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center p-4">
      <Card className="max-w-[450px] border-none bg-transparent shadow-none overflow-visible">
        <CardBody className="flex flex-col items-center gap-6 text-center overflow-visible">
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 rounded-full bg-danger-50 dark:bg-danger-900/10 mb-2">
              <AlertTriangle className="text-danger" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-default-900">
              System Hiccup
            </h2>
            <p className="text-sm text-default-500 max-w-[300px]">
              Something went wrong on our end. Press try again or head back
              home.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              color="danger"
              startContent={<RefreshCw size={18} />}
              variant="shadow"
              onPress={() => reset()}
            >
              Try Again
            </Button>
            <Button
              as={Link}
              href="/"
              startContent={<Home size={18} />}
              variant="flat"
            >
              Go Home
            </Button>
          </div>
          <div className="w-full mt-4">
            <Accordion
              itemClasses={{
                base: "bg-default-100/40 dark:bg-default-50/5 rounded-xl px-2",
                title:
                  "text-[10px] font-bold text-default-400 uppercase tracking-tighter",
                trigger: "py-2",
                content: "pt-0 pb-4",
              }}
              variant="light"
            >
              <AccordionItem
                key="1"
                startContent={
                  <ShieldAlert className="text-default-400" size={14} />
                }
                title="Technical Details"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-default-200/50 pb-2">
                    <span className="text-[10px] text-default-400 uppercase font-mono">
                      Log ID
                    </span>
                    <span className="text-[10px] font-mono bg-default-200 dark:bg-default-100 px-1.5 py-0.5 rounded text-default-700">
                      {error.digest || "DEV-MODE"}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-default-400 uppercase font-mono mb-1.5">
                      Message
                    </p>
                    <Snippet
                      hideSymbol
                      className="w-full text-xs font-mono justify-start py-2"
                      codeString={error.message}
                      color="danger"
                      variant="flat"
                    >
                      {error.message}
                    </Snippet>
                  </div>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
