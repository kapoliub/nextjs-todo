"use client";
import React from "react";
import { Map, MoveLeft, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center p-4">
      <Card className="max-w-[450px] border-none bg-transparent shadow-none overflow-visible">
        <CardBody className="flex flex-col items-center gap-8 text-center overflow-visible">
          <div className="relative flex items-center justify-center">
            <span className="absolute text-[120px] font-black text-default-100 select-none">
              404
            </span>
            <div className="relative z-10 p-6 rounded-[40px] bg-background shadow-2xl border border-default-100 animate-appearance-in">
              <Map className="text-primary" size={48} strokeWidth={1.5} />
            </div>
          </div>
          <div className="space-y-3 relative z-20">
            <h2 className="text-3xl font-bold tracking-tight text-default-900">
              You&apos;ve wandered off the map
            </h2>
            <p className="text-default-500 text-balance">
              The page you are looking for doesn&apos;t exist or has been moved
              to a secret location.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <Button
              as={Link}
              className="font-medium"
              color="primary"
              href="/"
              size="lg"
              startContent={<Home size={18} />}
              variant="shadow"
            >
              Back to Homepage
            </Button>
            <Button
              size="lg"
              startContent={<MoveLeft size={18} />}
              variant="flat"
              onPress={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
          <div className="flex gap-2 pt-4">
            <div className="h-2 w-8 rounded-full bg-primary/20" />
            <div className="h-2 w-2 rounded-full bg-primary/20" />
            <div className="h-2 w-2 rounded-full bg-primary/20" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
