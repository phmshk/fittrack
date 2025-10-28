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
  const { summary, isLoading } = useProgressSummary(range);
  const summaryCards = [
    {
      title: "Average Calories",
      value: `${summary.averageCalories} kcal`,
      icon: <Flame stroke="var(--calories-color)" className="size-6" />,
      dataKey: "calories",
    },
    {
      title: "Average Proteins",
      value: `${summary.averageProteins} g`,
      icon: <Beef stroke="var(--proteins-color)" className="size-6" />,
      dataKey: "proteins",
    },
    {
      title: "Average Carbs",
      value: `${summary.averageCarbs} g`,
      icon: <Wheat stroke="var(--carbs-color)" className="size-6" />,
      dataKey: "carbs",
    },
    {
      title: "Average Fats",
      value: `${summary.averageFats} g`,
      icon: <Zap stroke="var(--fats-color)" className="size-6" />,
      dataKey: "fats",
    },
  ];

  if (isLoading) {
    return (
      <Card className="mb-6 border-none">
        <CardHeader>
          <CardTitle>Your average nutritional intake</CardTitle>
          <CardDescription>
            Track your intake of calories, proteins, carbs, and fats over time.
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
        <H2>Your average nutritional intake</H2>
        <p className="text-muted-foreground">
          Track your intake of calories, proteins, carbs, and fats over time.
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
              {summary.dailyData.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No data available for the selected range.
                </p>
              ) : ( 
              <MacronutrientSummaryChart
                chartConfig={chartConfig}
                chartData={summary.dailyData}
                dataKey={card.dataKey}
              />)}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
