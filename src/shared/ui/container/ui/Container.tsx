import React from "react";
import { cn } from "@/shared/shadcn/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A responsive container that provides a full-width, mobile-first layout
 * and switches to a traditional centered, max-width layout on desktop.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        // Mobile (default) styles
        "flex w-full flex-col gap-4 p-4",
        // Desktop styles (md and up)
        "md:container md:mx-auto md:max-w-6xl md:gap-6",
        // Additional custom classes
        className,
      )}
    >
      {children}
    </div>
  );
}
