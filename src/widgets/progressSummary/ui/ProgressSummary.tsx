import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { Flame, Beef, Wheat, Zap } from "lucide-react";
import { useProgressSummary } from "../model/useProgressSummary";
import { Skeleton } from "@/shared/shadcn/components/ui/skeleton";
import type { DaysRange } from "@/widgets/rangeTabs";
import { type ChartConfig } from "@/shared/shadcn/components/ui/chart";
import { MacronutrientSummaryChart } from "@/widgets/macronutrientSummaryChart";
import { H2 } from "@/shared/ui/headings";
import { useTranslation } from "react-i18next";

const chartConfig = {
  calories: {
    label: "Calories",
    color: "var(--calories-color)",
  },
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

interface ProgressSummaryProps {
  range: DaysRange;
}

export const ProgressSummary = (props: ProgressSummaryProps) => {
  const { range } = props;
  const { t } = useTranslation(["progress", "nutrition"]);
  const { summary, isLoading } = useProgressSummary(range);
  console.log("ProgressSummary summary:", summary);
  const summaryCards = [
    {
      title: t("progress:progressSummary.averageCalories"),
      value: t("nutrition:units.totalCalories", {
        count: summary.averageCalories,
      }),
      icon: <Flame stroke="var(--calories-color)" className="size-6" />,
      dataKey: "calories",
    },
    {
      title: t("progress:progressSummary.averageProteins"),
      value: t("nutrition:units.totalGrams", {
        count: summary.averageProteins,
      }),
      icon: <Beef stroke="var(--proteins-color)" className="size-6" />,
      dataKey: "proteins",
    },
    {
      title: t("progress:progressSummary.averageCarbs"),
      value: t("nutrition:units.totalGrams", { count: summary.averageCarbs }),
      icon: <Wheat stroke="var(--carbs-color)" className="size-6" />,
      dataKey: "carbs",
    },
    {
      title: t("progress:progressSummary.averageFats"),
      value: t("nutrition:units.totalGrams", { count: summary.averageFats }),
      icon: <Zap stroke="var(--fats-color)" className="size-6" />,
      dataKey: "fats",
    },
  ];

  if (isLoading) {
    return (
      <Card className="mb-6 border-none">
        <CardHeader>
          <CardTitle>{t("progress:progressSummary.averageIntake")}</CardTitle>
          <CardDescription>
            {t("progress:progressSummary.averageIntakeDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[150px] w-full" />
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div>
        <H2>{t("progress:progressSummary.averageIntake")}</H2>
        <p className="text-muted-foreground">
          {t("progress:progressSummary.averageIntakeDescription")}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {summaryCards.map((card) => (
          <Card key={card.title} className="border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
            <CardFooter>
              {summary.dailyData.length < 2 ? (
                <p className="text-muted-foreground text-sm">
                  {t("progress:progressSummary.noData")}
                </p>
              ) : (
                <MacronutrientSummaryChart
                  chartConfig={chartConfig}
                  chartData={summary.dailyData}
                  dataKey={card.dataKey}
                />
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
