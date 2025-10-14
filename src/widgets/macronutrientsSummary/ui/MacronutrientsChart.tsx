import type { DaySummary } from "@/entities/day";
import { useBreakpoint } from "@/shared/lib";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/shadcn/components/ui/chart";
import { useMemo } from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

const chartConfig = {
  proteins: {
    label: "Proteins",
    color: "var(--proteins-color)",
  },
  carbs: {
    label: "Carbs",
    color: "var(--carbs-color)",
  },
  fats: {
    label: "Fats",
    color: "var(--fats-color)",
  },
} satisfies ChartConfig;

interface MacronutrientsChartProps {
  daySummary: DaySummary;
}

export const MacronutrientsChart = (props: MacronutrientsChartProps) => {
  const { daySummary } = props;
  const isMobile = useBreakpoint();

  const chartData = useMemo(() => {
    return [
      {
        name: "Proteins",
        value: daySummary.consumedProteins,
      },
      {
        name: "Carbs",
        value: daySummary.consumedCarbs,
      },
      {
        name: "Fats",
        value: daySummary.consumedFats,
      },
    ].filter((item) => item.value > 0);
  }, [daySummary]);

  const totalCalories = daySummary.consumedCalories;

  if (totalCalories === 0) {
    return (
      <Card className="h-full border-none">
        <CardHeader>
          <CardTitle>Macronutrient Distribution</CardTitle>
          <CardDescription>
            Distribution of proteins, carbs, and fats for the selected day.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex h-64 items-center justify-center">
            <p>No data for this day to display the chart.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border-none">
      <CardHeader>
        <CardTitle>Macronutrient Distribution</CardTitle>
        <CardDescription>
          Track your daily macronutrients consumption.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              label={isMobile}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={3}
              paddingAngle={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {daySummary.consumedCalories.toFixed(0)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          kcal
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
              {chartData.map((entry) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={
                    chartConfig[
                      entry.name.toLowerCase() as keyof typeof chartConfig
                    ].color
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground flex justify-center gap-4">
          {chartData.map((entry) => (
            <div key={entry.name} className="flex items-center gap-1">
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor:
                    chartConfig[
                      entry.name.toLowerCase() as keyof typeof chartConfig
                    ].color,
                }}
              />
              {entry.name + " (g)"}
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};
