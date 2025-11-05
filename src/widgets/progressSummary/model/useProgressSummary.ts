import { useGetFoodsByDateRange } from "@/entities/day";
import type { DaysRange } from "@/widgets/rangeTabs";
import { subDays } from "date-fns/subDays";
import { useMemo } from "react";

export const useProgressSummary = (rangeInDays: DaysRange) => {
  const rangeAsNumber = {
    "7d": 7,
    "30d": 30,
    "90d": 90,
    all: 365, // For simplicity, treat 'all' as 1 year
  } as const;
  const to = new Date();
  const from = subDays(to, rangeAsNumber[rangeInDays]);

  const { data: foodLogs, isLoading } = useGetFoodsByDateRange({ from, to });

  const summary = useMemo(() => {
    const defaultSummary = {
      averageCalories: 0,
      averageProteins: 0,
      averageCarbs: 0,
      averageFats: 0,
      totalDays: 0,
      dailyData: [],
    };

    if (!foodLogs || foodLogs.length === 0) {
      return defaultSummary;
    }

    const dailyTotals: Record<
      string,
      {
        calories: number;
        proteins: number;
        carbs: number;
        fats: number;
      }
    > = {};

    foodLogs.forEach((log) => {
      if (!dailyTotals[log.date]) {
        dailyTotals[log.date] = {
          calories: 0,
          proteins: 0,
          carbs: 0,
          fats: 0,
        };
      }
      dailyTotals[log.date].calories += log.calories;
      dailyTotals[log.date].proteins += log.proteins;
      dailyTotals[log.date].carbs += log.carbs;
      dailyTotals[log.date].fats += log.fats;
    });

    const dailyData = Object.entries(dailyTotals)
      .map(([date, totals]) => ({
        date: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        ...totals,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const totalDays = Object.keys(dailyTotals).length;
    const totalCalories = Object.values(dailyTotals).reduce(
      (acc, day) => acc + day.calories,
      0,
    );
    const totalProteins = Object.values(dailyTotals).reduce(
      (acc, day) => acc + day.proteins,
      0,
    );
    const totalCarbs = Object.values(dailyTotals).reduce(
      (acc, day) => acc + day.carbs,
      0,
    );
    const totalFats = Object.values(dailyTotals).reduce(
      (acc, day) => acc + day.fats,
      0,
    );

    return {
      averageCalories: Math.round(totalCalories / totalDays) || 0,
      averageProteins: Math.round(totalProteins / totalDays) || 0,
      averageCarbs: Math.round(totalCarbs / totalDays) || 0,
      averageFats: Math.round(totalFats / totalDays) || 0,
      totalDays,
      dailyData,
    };
  }, [foodLogs]);

  return { summary, isLoading };
};
