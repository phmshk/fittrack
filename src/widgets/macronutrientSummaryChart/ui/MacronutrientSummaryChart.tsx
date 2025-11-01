import { useBreakpoint, useCalculateTicksForXAxis } from "@/shared/lib";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/shadcn/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { DailyData } from "../model/types";
import { useTranslation } from "react-i18next";

interface MacronutrientSummaryChartProps {
  chartConfig: ChartConfig;
  chartData: DailyData[];
  dataKey: string;
}

export const MacronutrientSummaryChart = (
  props: MacronutrientSummaryChartProps,
) => {
  const { chartConfig, chartData, dataKey } = props;
  const { t } = useTranslation("nutrition");
  const isMobile = useBreakpoint();
  // Dynamically generate ticks for the XAxis to prevent cluttering and ensure the last tick is always visible.
  const xAxisTicks = useCalculateTicksForXAxis(chartData, isMobile);

  return (
    <ChartContainer className="h-[150px] w-full" config={chartConfig}>
      <AreaChart accessibilityLayer data={chartData} margin={{ left: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          ticks={xAxisTicks}
          tickFormatter={(value) => value.slice(0, 6)}
          fontSize={12}
        />
        <YAxis
          unit={
            dataKey === "calories"
              ? t("nutrition:units.kcal")
              : t("nutrition:units.g")
          }
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          stroke="var(--muted-foreground)"
          fontSize={12}
        />
        {!isMobile && (
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
        )}
        <Area
          dataKey={dataKey}
          type="natural"
          fill={`var(--color-${dataKey})`}
          fillOpacity={0.4}
          stroke={`var(--color-${dataKey})`}
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};
