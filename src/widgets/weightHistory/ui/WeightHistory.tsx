import type { WeightLog } from "@/entities/user";
import { WeightChart } from "./WeightChart";
import type { DaysRange } from "@/widgets/rangeTabs";
import { H2 } from "@/shared/ui/headings";

interface WeightHistoryProps {
  weightHistory: WeightLog[];
  range: DaysRange;
}

export const WeightHistory = (props: WeightHistoryProps) => {
  const { weightHistory, range } = props;
  return (
    <>
      <div>
        <H2>Your Weight Trend</H2>
        <p className="text-muted-foreground">
          A chart showing your weight progress over time.
        </p>
      </div>

      <div className="max-w-2xl">
        <WeightChart data={weightHistory} range={range} />
      </div>
    </>
  );
};
