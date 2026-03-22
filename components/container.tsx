import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className="container-wrapper">
      <div className={cn("relative container", className)}>
        <div
          className={cn(
            "border-x 2xl:w-10 lg:w-8 w-5  bg-white h-full",
            "absolute top-0 left-0 ",
            "bg-[repeating-linear-gradient(135deg,#f0f0f0_0px_1px,transparent_1px_10px)]",
          )}
        />
        <div
          className={cn(
            "border-x 2xl:w-10 lg:w-8 w-5  bg-white h-full",
            "absolute top-0 right-0",
            "bg-[repeating-linear-gradient(135deg,#f0f0f0_0px_1px,transparent_1px_10px)]",
          )}
        />
        {children}
      </div>
    </div>
  );
}
