import { cn } from "@/lib/utils";
import React from "react";
type ContentBlockProps = {
  className?: string;
  children: React.ReactNode;
};
export default function ContentBlock({
  className,
  children,
}: ContentBlockProps) {
  return (
    <div
      className={cn(
        "bg-[#F7F8FA] shadow-sm rounded-md overflow-hidden h-full",
        className,
      )}
    >
      {children}
    </div>
  );
}
