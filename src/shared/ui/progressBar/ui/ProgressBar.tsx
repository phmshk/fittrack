import { Progress } from "@/shared/shadcn/components/ui/progress";
import { cn } from "@/shared/shadcn/lib/utils";

export interface ProgressBarProps {
  label: string;
  currentValue: number;
  goalValue: number;
  units?: string;
  className?: string;
}

export const ProgressBar = (props: ProgressBarProps) => {
  const { label, currentValue, goalValue, units, className } = props;

  const progressPercentage =
    goalValue > 0 ? (currentValue / goalValue) * 100 : 0;

  const isOverGoal = currentValue > goalValue;
  const color = isOverGoal ? "var(--destructive)" : "var(--primary)";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between">
        <span className="text-foreground text-base font-medium">{label}</span>
        <span className="text-muted-foreground text-sm">
          <span
            className={cn(isOverGoal && "text-destructive/80")}
          >{`${currentValue}${units}`}</span>{" "}
          / {`${goalValue}${units}`}
        </span>
      </div>
      <div style={{ "--progress-color": color } as React.CSSProperties}>
        <Progress value={isOverGoal ? 100 : progressPercentage} />
      </div>
    </div>
  );
};
