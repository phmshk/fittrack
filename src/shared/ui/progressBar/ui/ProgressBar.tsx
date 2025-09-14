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

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between">
        <span className="text-base font-medium text-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">
          <span
            className={cn(isOverGoal && "text-destructive")}
          >{`${currentValue}${units}`}</span>{" "}
          / {`${goalValue}${units}`}
        </span>
      </div>
      <Progress
        value={isOverGoal ? 100 : progressPercentage}
        indicatorColor={isOverGoal ? "bg-destructive" : "bg-primary"}
      />
    </div>
  );
};
