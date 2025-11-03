import { apiClient } from "@/shared/api/apiClient";
import { formatDateForApi } from "@/shared/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { WaterLog, WaterLogInput } from "../model/types";
import { toast } from "sonner";
import { t } from "i18next";

const waterKeys = {
  all: ["water-logs"] as const,
  lists: () => [...waterKeys.all, "list"] as const,
  list: (date: string) => [...waterKeys.lists(), { date }] as const,
};

export const useGetWaterByDate = (date: Date) => {
  const dateString = formatDateForApi(date);
  return useQuery({
    queryKey: waterKeys.list(dateString),
    queryFn: async () => {
      const { data, error } = await apiClient.GET(`/water-logs/{date}`, {
        params: { path: { date: dateString } },
      });
      if (error) throw error;
      return data ? data : null;
    },
  });
};

export const useAddWaterLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLog: WaterLogInput) => {
      const { data, error } = await apiClient.POST("/water-logs", {
        body: newLog,
      });
      if (error) throw error;
      return data;
    },
    onMutate: async (newLog) => {
      const queryKey = waterKeys.list(newLog.date);

      await queryClient.cancelQueries({ queryKey });

      const previousLog = queryClient.getQueryData<WaterLog | null>(queryKey);
      const optimisticLog: WaterLog = {
        id: crypto.randomUUID(),
        ...newLog,
      };

      queryClient.setQueryData<WaterLog | null>(queryKey, optimisticLog);
      return { previousLog, queryKey };
    },
    onError: (_err, _newLog, onMutateResult) => {
      toast.error(t("common:notifications.errorAddingWaterLog"));
      queryClient.setQueryData(
        [onMutateResult?.queryKey],
        onMutateResult?.previousLog,
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(waterKeys.list(data.date), data);
    },

    onSettled: (_data, _error, _variables, onMutateResult) => {
      queryClient.invalidateQueries({ queryKey: onMutateResult?.queryKey });
    },
  });
};

export const useUpdateWaterLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: {
      id: string;
      amount: number;
      date: string;
    }) => {
      const { data, error } = await apiClient.PUT(`/water-logs/{id}`, {
        params: { path: { id: updates.id } },
        body: { amount: updates.amount, date: updates.date },
      });
      if (error) throw error;
      return data;
    },
    onMutate: async (updates) => {
      const queryKey = waterKeys.list(updates.date);

      await queryClient.cancelQueries({ queryKey });

      const previousLog = queryClient.getQueryData<WaterLog | null>(queryKey);

      queryClient.setQueryData<WaterLog | null>(queryKey, (old) => {
        if (!old) return null;
        return { ...old, ...updates };
      });

      return { previousLog, queryKey };
    },

    onError: (_err, _updates, onMutateResult) => {
      toast.error(t("common:notifications.errorUpdatingWaterLog"));
      queryClient.setQueryData(
        [onMutateResult?.queryKey],
        onMutateResult?.previousLog,
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(waterKeys.list(data.date), data);
    },

    onSettled: (_data, _error, _variables, onMutateResult) => {
      queryClient.invalidateQueries({ queryKey: onMutateResult?.queryKey });
    },
  });
};
