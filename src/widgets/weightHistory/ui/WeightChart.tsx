import type { WeightLog } from "@/entities/user";
import { Card, CardContent } from "@/shared/shadcn/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/shadcn/components/ui/chart";
import { useMemo } from "react";
import { useBreakpoint, useCalculateTicksForXAxis } from "@/shared/lib";
import { useChartData } from "../model/useChartData";
import type { DaysRange } from "@/widgets/rangeTabs";
import { useTranslation } from "react-i18next";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  weight: {
    label: "Weight",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface WeightChartProps {
  data: WeightLog[];
  range: DaysRange;
}

export const WeightChart = (props: WeightChartProps) => {
  const { data, range } = props;
  const { t } = useTranslation("progress");
  const isMobile = useBreakpoint();
  const chartData = useChartData(data, range);
  const yAxisDomain = useMemo(() => {
    if (data.length < 2) {
      return [60, 90]; // Default range if not enough data
    }
    const weights = data.map((item) => item.weight);
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);
    const padding = 2;

    return [Math.floor(minWeight - padding), Math.ceil(maxWeight + padding)];
  }, [data]);
  // Dynamically generate ticks for the XAxis to prevent cluttering and ensure the last tick is always visible.
  const xAxisTicks = useCalculateTicksForXAxis(chartData, isMobile);

  if (data.length < 2) {
    return (
      <Card className="mb-6 border-none">
        <CardContent>
          <div className="text-muted-foreground flex h-64 items-center justify-center">
            <p>{t("progress:weightChart.noData")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-none">
      <CardContent className="px-6">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart accessibilityLayer data={chartData} margin={{ right: 20 }}>
            <CartesianGrid />
            <XAxis
              dataKey={`date`}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="var(--muted-foreground)"
              fontSize={12}
              ticks={xAxisTicks}
            />
            <YAxis
              unit="kg"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="var(--muted-foreground)"
              fontSize={12}
              domain={yAxisDomain}
            />
            {!isMobile && <ChartTooltip content={<ChartTooltipContent />} />}
            <Line
              dataKey="weight"
              type="monotone"
              strokeWidth={2}
              stroke={chartConfig.weight.color}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
