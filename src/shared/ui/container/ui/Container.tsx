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
    <section
      className={cn(
        "container mx-auto flex max-w-6xl flex-col gap-4 p-4 md:gap-6",
        className,
      )}
    >
      {children}
    </section>
  );
}
