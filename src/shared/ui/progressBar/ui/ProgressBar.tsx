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

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex justify-between items-baseline">
        <span className="text-base font-medium text-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">
          {`${currentValue}${units}`} / {`${goalValue}${units}`}
        </span>
      </div>
      <Progress value={progressPercentage} />
    </div>
  );
};
