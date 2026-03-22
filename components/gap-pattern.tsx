import React from "react";
import { cn } from "@/lib/utils";

interface GapPatternProps {
  className?: string;
}

export function GapPattern({ className }: GapPatternProps) {
  return (
    <div
      className={cn(
        "border-y w-full bg-white",
        "bg-[repeating-linear-gradient(135deg,#f0f0f0_0px_1px,transparent_1px_10px)]",
        className,
      )}
    />
  );
}
