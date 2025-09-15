import React from "react";
import { cn } from "@/shared/shadcn/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A responsive container component that centers its content and applies horizontal padding.
 * It adjusts its padding based on the screen size to ensure optimal spacing.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
}
