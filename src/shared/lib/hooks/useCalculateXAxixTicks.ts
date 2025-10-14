import { useMemo } from "react";

export const useCalculateTicksForXAxis = <T extends { date: string }>(
  chartData: T[],
  isMobile: boolean,
) => {
  const xAxisTicks = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return [];
    }

    const maxTicks = isMobile ? 4 : 6;
    if (chartData.length <= maxTicks) {
      return chartData.map((d) => d.date);
    }

    const ticks = new Set<string>();
    // Always include the first tick
    ticks.add(chartData[0].date);

    // Calculate step to pick intermediate ticks
    const step = Math.floor((chartData.length - 1) / (maxTicks - 1));

    for (let i = 1; i < maxTicks - 1; i++) {
      const index = Math.min(i * step, chartData.length - 1);
      ticks.add(chartData[index].date);
    }

    // Always include the last tick
    ticks.add(chartData[chartData.length - 1].date);

    return Array.from(ticks);
  }, [chartData, isMobile]);
  return xAxisTicks;
};
