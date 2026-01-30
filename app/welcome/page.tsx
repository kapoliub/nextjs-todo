"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { PartyPopper, ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import { PATHS } from "@/lib/paths";

export default function Welcome() {
  const [isHashValid, setIsHashValid] = useState(true);
  const [mounted, setMounted] = useState(false);

  const requiredParts = [
    "access_token",
    "expires_in",
    "refresh_token",
    "type=signup",
    // "token_type=bearer"
  ];

  useEffect(() => {
    setMounted(true);
    const hash = window.location.hash;
    const allPresent = requiredParts.every((part) => hash.includes(part));

    setIsHashValid(allPresent);
  }, []);

  if (!mounted) return null;
  if (!isHashValid) return notFound();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      <Card className="max-w-md w-full border-none bg-default-100/40 backdrop-blur-md shadow-xl py-8">
        <CardBody className="flex flex-col items-center text-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
            <div className="relative bg-primary text-white p-4 rounded-2xl shadow-lg animate-in zoom-in duration-500">
              <PartyPopper size={40} strokeWidth={1.5} />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-default-900">
              Welcome aboard!
            </h1>
            <p className="text-default-500 font-medium">
              Your account has been successfully verified. <br />
              Ready to get started?
            </p>
          </div>
          <div className="w-full bg-background/50 rounded-xl p-4 border border-default-200/50 space-y-3">
            <div className="flex items-center gap-3 text-sm text-default-600">
              <CheckCircle2 className="text-success" size={18} />
              <span>Email verified</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-default-600">
              <CheckCircle2 className="text-success" size={18} />
              <span>Security tokens generated</span>
            </div>
          </div>
          <Button
            as={Link}
            className="w-full font-bold h-14 text-md"
            color="primary"
            endContent={<ArrowRight size={20} />}
            href={PATHS.login}
            size="lg"
            variant="shadow"
          >
            Go to Login
          </Button>
          <p className="text-tiny text-default-400">
            Having trouble?{" "}
            <Link className="text-primary hover:underline" href="/support">
              Contact support
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
