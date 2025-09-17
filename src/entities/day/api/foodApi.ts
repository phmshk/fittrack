import { apiClient } from "@/shared/api/apiClient";
import type { FoodLog, FoodLogInput } from "@/shared/api/schema";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useAddFoodLog = () => {
  return useMutation({
    mutationFn: async (newLog: FoodLogInput) => {
      const { data, error } = await apiClient.POST("/food-logs", {
        body: newLog,
      });
      if (error) throw error;
      return data;
    },
    onMutate: async (newLog, context) => {
      const queryKey = foodKeys.list(newLog.date);

      await context.client.cancelQueries({ queryKey });

      const previousLogs = context.client.getQueryData<FoodLog[]>(queryKey);

      const optimisticLog: FoodLog = {
        id: crypto.randomUUID(),
        name: newLog.name,
        calories: newLog.calories,
        proteins: newLog.proteins || 0,
        fats: newLog.fats || 0,
        carbs: newLog.carbs || 0,
        date: newLog.date,
        grams: newLog.grams || 0,
        mealType: newLog.mealType,
      };

      context.client.setQueryData<FoodLog[]>(queryKey, (old) => [
        ...(old || []),
        optimisticLog,
      ]);

      return { previousLogs, queryKey };
    },

    onError: (err, newLog, onMutateResult, context) => {
      context.client.setQueryData(
        [onMutateResult?.queryKey],
        onMutateResult?.previousLogs,
      );
    },

    onSettled: (data, error, variables, onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: onMutateResult?.queryKey });
    },
  });
};

export const useUpdateFoodLog = () => {
  return useMutation({
    mutationFn: async (params: { id: string; updatedLog: FoodLogInput }) => {
      const { id, updatedLog } = params;
      const { data, error } = await apiClient.PUT("/food-logs/{id}", {
        params: { path: { id } },
        body: updatedLog,
      });
      if (error) throw error;
      return data;
    },

    onMutate: async (newLog, context) => {
      const queryKey = foodKeys.list(newLog.updatedLog.date);

      await context.client.cancelQueries({ queryKey });

      const previousLogs = context.client.getQueryData<FoodLog[]>(queryKey);

      context.client.setQueryData<FoodLog[]>(queryKey, (old) =>
        old
          ? old.map((log) =>
              log.id === newLog.id ? { ...log, ...newLog.updatedLog } : log,
            )
          : [],
      );

      return { previousLogs, newLog, queryKey };
    },

    onError: (err, newLog, onMutateResult, context) => {
      context.client.setQueryData(
        [onMutateResult?.queryKey],
        onMutateResult?.previousLogs,
      );
    },

    onSettled: (newLog, error, variables, onMutateResult, context) =>
      context.client.invalidateQueries({
        queryKey: [onMutateResult?.queryKey],
      }),
  });
};

export const useDeleteFoodLog = () => {
  return useMutation({
    mutationFn: async (params: { id: string; date: string }) => {
      const { id } = params;
      const { error } = await apiClient.DELETE("/food-logs/{id}", {
        params: { path: { id } },
      });
      if (error) throw error;
    },
    onMutate: async (newLog, context) => {
      const queryKey = foodKeys.list(newLog.date);

      await context.client.cancelQueries({ queryKey });

      const previousLogs = context.client.getQueryData<FoodLog[]>(queryKey);

      context.client.setQueryData<FoodLog[]>(queryKey, (old) =>
        old ? old.filter((log) => log.id !== newLog.id) : [],
      );

      return { previousLogs, queryKey };
    },

    onError: (err, newLog, onMutateResult, context) => {
      context.client.setQueryData(
        [onMutateResult?.queryKey],
        onMutateResult?.previousLogs,
      );
    },
    onSettled: (newLog, error, variables, onMutateResult, context) =>
      context.client.invalidateQueries({
        queryKey: [onMutateResult?.queryKey],
      }),
  });
};
