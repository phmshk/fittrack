import type { WeightLog } from "@/entities/user";
import { formatDateForApi } from "@/shared/lib/utils";
import { startOfWeek, subDays } from "date-fns";
import { useMemo } from "react";
import type { DaysRange } from "./types";

/**
 * Aggregate weight log data by week.
 * @param data Array of WeightLog entries
 * @returns Array of aggregated weight data by week
 */
const aggregateDataByWeek = (data: WeightLog[]) => {
  const weeklyData: { [key: string]: { sum: number; count: number } } = {};

  data.forEach((entry) => {
    const weekStart = formatDateForApi(startOfWeek(new Date(entry.date)));

    if (!weeklyData[weekStart]) {
      weeklyData[weekStart] = { sum: 0, count: 0 };
    }

    weeklyData[weekStart].sum += entry.weight;
    weeklyData[weekStart].count += 1;
  });

  return Object.keys(weeklyData).map((weekStart) => ({
    date: new Date(weekStart).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    weight: weeklyData[weekStart].sum / weeklyData[weekStart].count,
  }));
};

export const useChartData = (data: WeightLog[], range: DaysRange) => {
  return useMemo(() => {
    const now = new Date();
    let filteredData = data;

    switch (range) {
      case "7d": {
        const sevenDaysAgo = subDays(now, 7);
        filteredData = data.filter(
          (entry) => new Date(entry.date) >= sevenDaysAgo,
        );
        break;
      }
      case "30d": {
        const thirtyDaysAgo = subDays(now, 30);
        filteredData = data.filter(
          (entry) => new Date(entry.date) >= thirtyDaysAgo,
        );
        break;
      }
      case "90d": {
        const ninetyDaysAgo = subDays(now, 90);
        filteredData = data.filter(
          (entry) => new Date(entry.date) >= ninetyDaysAgo,
        );
        break;
      }
      case "1y": {
        const oneYearAgo = subDays(now, 365);
        filteredData = data.filter(
          (entry) => new Date(entry.date) >= oneYearAgo,
        );
        break;
      }
      case "all":
        filteredData = data;
        break;
    }

    const sortedData = filteredData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    if (range === "all" && sortedData.length > 20) {
      return aggregateDataByWeek(sortedData);
    }

    return sortedData.map((entry) => ({
      date: new Date(entry.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      weight: entry.weight,
    }));
  }, [data, range]);
};
