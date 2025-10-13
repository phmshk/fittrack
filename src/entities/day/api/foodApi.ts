import { apiClient } from "@/shared/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDateForApi } from "@/shared/lib/utils";
import type { FoodLog } from "../model/types";
import { toast } from "sonner";
import { calculateFinalNutrientsValues } from "../lib/helpers";
import type { FormOutput } from "../model/zodFoodSchema";

// --- Keys for food logs ---
export const foodKeys = {
  all: ["food-logs"] as const,
  lists: () => [...foodKeys.all, "list"] as const,
  list: (date: string | { from: string; to: string }) =>
    [...foodKeys.lists(), { date }] as const,
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

export const useGetFoodsByDateRange = (params: { from: Date; to: Date }) => {
  const { from, to } = params;
  const fromString = formatDateForApi(from);
  const toString = formatDateForApi(to);

  return useQuery({
    queryKey: foodKeys.list({ from: fromString, to: toString }),
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/food-logs", {
        params: {
          query: {
            from: fromString,
            to: toString,
          },
        },
      });

      if (error) throw error;
      return data;
    },
    enabled: !!(from && to),
  });
};

export const useAddFoodLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLog: FormOutput) => {
      const finalLog = calculateFinalNutrientsValues(newLog);
      const { data, error } = await apiClient.POST("/food-logs", {
        body: finalLog,
      });
      if (error) throw error;
      return data;
    },
    onMutate: async (newLog) => {
      const finalLog = calculateFinalNutrientsValues(newLog);
      const queryKey = foodKeys.list(finalLog.date);

      await queryClient.cancelQueries({ queryKey });

      const previousLogs = queryClient.getQueryData<FoodLog[]>(queryKey);

      const optimisticLog: FoodLog = {
        id: crypto.randomUUID(),
        ...finalLog,
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
    mutationFn: async (params: { id: string; updatedLog: FormOutput }) => {
      const finalLog = calculateFinalNutrientsValues(params.updatedLog);
      const { id } = params;
      const { data, error } = await apiClient.PUT("/food-logs/{id}", {
        params: { path: { id } },
        body: finalLog,
      });
      if (error) throw error;
      return data;
    },

    onMutate: async (newLog) => {
      const finalLog = {
        id: newLog.id,
        ...calculateFinalNutrientsValues(newLog.updatedLog),
      };
      const queryKey = foodKeys.list(finalLog.date);

      await queryClient.cancelQueries({ queryKey });

      const previousLogs = queryClient.getQueryData<FoodLog[]>(queryKey);

      queryClient.setQueryData<FoodLog[]>(queryKey, (old) =>
        old
          ? old.map((log) =>
              log.id === finalLog.id ? { ...log, ...finalLog } : log,
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
