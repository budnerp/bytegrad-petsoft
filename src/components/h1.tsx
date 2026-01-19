import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type H1Props = {
  className?: string;
  children: ReactNode;
};

export default function H1({ className, children }: H1Props) {
  return (
    <h1 className={cn("font-medium text-2xl leading-6", className)}>
      {children}
    </h1>
  );
}
