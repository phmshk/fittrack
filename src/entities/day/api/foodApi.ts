import { apiClient } from "@/shared/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDateForApi } from "@/shared/utils";
import type { FoodLog, FoodLogInput } from "../model/types";
import { toast } from "sonner";

// --- Keys for food logs ---
export const foodKeys = {
  all: ["food-logs"] as const,
  lists: () => [...foodKeys.all, "list"] as const,
  list: (date: string) => [...foodKeys.lists(), { date }] as const,
};

// --- Hooks for food logs ---
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

      if (error) throw error;
      return data;
    },
  });
};

export const useAddFoodLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLog: FoodLogInput) => {
      const { data, error } = await apiClient.POST("/food-logs", {
        body: newLog,
      });
      if (error) throw error;
      return data;
    },
    onMutate: async (newLog) => {
      const queryKey = foodKeys.list(newLog.date);

      await queryClient.cancelQueries({ queryKey });

      const previousLogs = queryClient.getQueryData<FoodLog[]>(queryKey);

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

      queryClient.setQueryData<FoodLog[]>(queryKey, (old) => [
        ...(old || []),
        optimisticLog,
      ]);

      return { previousLogs, queryKey };
    },

    onError: (err, newLog, onMutateResult) => {
      toast.error("Error adding food log");
      queryClient.setQueryData(
        [onMutateResult?.queryKey],
        onMutateResult?.previousLogs,
      );
    },
    onSuccess: (data) =>
      toast.success(`Successfully added ${data?.name} to ${data?.mealType}`),

    onSettled: (data, error, variables, onMutateResult) => {
      queryClient.invalidateQueries({ queryKey: onMutateResult?.queryKey });
    },
  });
};

export const useUpdateFoodLog = () => {
  const queryClient = useQueryClient();
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

    onMutate: async (newLog) => {
      const queryKey = foodKeys.list(newLog.updatedLog.date);

      await queryClient.cancelQueries({ queryKey });

      const previousLogs = queryClient.getQueryData<FoodLog[]>(queryKey);

      queryClient.setQueryData<FoodLog[]>(queryKey, (old) =>
        old
          ? old.map((log) =>
              log.id === newLog.id ? { ...log, ...newLog.updatedLog } : log,
            )
          : [],
      );

      return { previousLogs, newLog, queryKey };
    },

    onError: (err, newLog, onMutateResult) => {
      toast.error("Error updating food log");
      queryClient.setQueryData(
        [onMutateResult?.queryKey],
        onMutateResult?.previousLogs,
      );
    },

    onSuccess: (data) =>
      toast.success(`Successfully updated ${data?.name} in ${data?.mealType}`),

    onSettled: (newLog, error, variables, onMutateResult) =>
      queryClient.invalidateQueries({
        queryKey: [onMutateResult?.queryKey],
      }),
  });
};

export const useDeleteFoodLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; date: string }) => {
      const { id } = params;
      const { error } = await apiClient.DELETE("/food-logs/{id}", {
        params: { path: { id } },
      });
      if (error) throw error;
    },
    onMutate: async (newLog) => {
      const queryKey = foodKeys.list(newLog.date);

      await queryClient.cancelQueries({ queryKey });

      const previousLogs = queryClient.getQueryData<FoodLog[]>(queryKey);

      queryClient.setQueryData<FoodLog[]>(queryKey, (old) =>
        old ? old.filter((log) => log.id !== newLog.id) : [],
      );

      return { previousLogs, queryKey };
    },

    onError: (err, newLog, onMutateResult) => {
      toast.error("Error deleting food log");
      queryClient.setQueryData(
        [onMutateResult?.queryKey],
        onMutateResult?.previousLogs,
      );
    },
    onSuccess: () => toast.success("Deletion successful"),
    onSettled: (newLog, error, variables, onMutateResult) =>
      queryClient.invalidateQueries({
        queryKey: [onMutateResult?.queryKey],
      }),
  });
};
