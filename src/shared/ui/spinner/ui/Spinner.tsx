import { cn } from "@/shared/shadcn/lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  className?: string;
  text?: string;
}

export const Spinner = ({ className, text }: SpinnerProps) => {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className,
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      {text && <span className="text-muted-foreground">{text}</span>}
      <span className="sr-only">Loading...</span>
    </div>
  );
};
