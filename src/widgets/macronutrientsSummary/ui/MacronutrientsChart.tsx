import type { DaySummary } from "@/entities/day";
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
import { Progress } from "@/shared/shadcn/components/ui/progress";
import { useMemo } from "react";
import { Cell, Label, Pie, PieChart } from "recharts";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["dashboard", "nutrition"]);

  const chartData = useMemo(() => {
    return [
      {
        label: "Proteins",
        name: t("nutrition:macronutrients.proteins"),
        value: Number(daySummary.consumedProteins.toFixed(1)),
      },
      {
        label: "Carbs",
        name: t("nutrition:macronutrients.carbs"),
        value: Number(daySummary.consumedCarbs.toFixed(1)),
      },
      {
        label: "Fats",
        name: t("nutrition:macronutrients.fats"),
        value: Number(daySummary.consumedFats.toFixed(1)),
      },
    ].filter((item) => item.value > 0);
  }, [daySummary]);

  const totalCalories = daySummary.consumedCalories;

  if (totalCalories === 0) {
    return (
      <Card className="h-full border-none">
        <CardHeader>
          <CardTitle>{t("dashboard:macrosChart.title")}</CardTitle>
          <CardDescription>
            {t("dashboard:macrosChart.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex h-64 items-center justify-center text-center">
            <p>{t("dashboard:macrosChart.noDataForChart")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full justify-around border-none">
      <CardHeader>
        <CardTitle>{t("dashboard:macrosChart.title")}</CardTitle>
        <CardDescription>
          {t("dashboard:macrosChart.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-[170px] md:aspect-square"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
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
                          {t("nutrition:units.kcal")}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
              {Object.values(chartConfig).map((entry) => (
                <Cell key={`cell-${entry.label}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-muted-foreground flex flex-row flex-wrap justify-center gap-2 text-sm">
        {chartData.map((entry) => {
          let max;
          switch (entry.label) {
            case "Proteins":
              max = daySummary.consumedProteins + daySummary.remainingProteins;
              break;
            case "Carbs":
              max = daySummary.consumedCarbs + daySummary.remainingCarbs;
              break;
            case "Fats":
              max = daySummary.consumedFats + daySummary.remainingFats;
              break;
            default:
              max = 1;
          }
          const progressPercentage = Number(
            ((entry.value / max) * 100).toFixed(0),
          );

          return (
            <div
              key={entry.label}
              className="flex flex-1 flex-col items-center gap-1"
            >
              {entry.name}
              <Progress
                value={progressPercentage}
                style={
                  {
                    "--progress-color":
                      chartConfig[
                        entry.label.toLowerCase() as keyof typeof chartConfig
                      ].color,
                  } as React.CSSProperties
                }
              />
              <span className="text-center font-medium">
                {`${progressPercentage.toFixed(0)}% (${t("nutrition:units.totalGrams", { count: entry.value })})`}
              </span>
            </div>
          );
        })}
      </CardFooter>
    </Card>
  );
};
