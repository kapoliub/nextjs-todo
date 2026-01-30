import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { ReactNode } from "react";

interface AuthCardWrapperProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  headerIcon: ReactNode;
}

export default function AuthCardWrapper({
  children,
  title,
  subtitle,
  headerIcon,
}: AuthCardWrapperProps) {
  return (
    <div className="relative group w-full max-w-[450px] mx-auto">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
      <Card className="relative border-none bg-background/60 backdrop-blur-xl shadow-2xl">
        <CardHeader className="flex flex-col items-center gap-2 pt-8 pb-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-2 shadow-inner">
            {headerIcon}
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-small text-default-500">{subtitle}</p>
        </CardHeader>
        <Divider className="mx-8 w-auto opacity-50" />
        <CardBody className="px-8 py-6">{children}</CardBody>
      </Card>
      <div className="flex justify-center gap-2 mt-6 opacity-40">
        <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
        <div className="h-1.5 w-8 rounded-full bg-primary" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
      </div>
    </div>
  );
}
