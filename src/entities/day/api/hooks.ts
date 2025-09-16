import { apiClient } from "@/shared/api/apiClient";
import { useQuery } from "@tanstack/react-query";

const formatDateForApi = (date: Date): string =>
  date.toISOString().split("T")[0];

export const foodKeys = {
  all: ["food-logs"] as const,
  lists: () => [...foodKeys.all, "list"] as const,
  list: (date: string) => [...foodKeys.lists(), { date }] as const,
};

export const useGetFoodsByDate = (date: Date) => {
  const dateString = formatDateForApi(date);

  return useQuery({
    queryKey: foodKeys.list(dateString),
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/food-logs/{date}", {
        params: {
          path: { date: dateString },
        },
      });

      if (error) {
        throw error;
      }
      return data;
    },
  });
};
