import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, WeightLog, WeightLogInput } from "../model/types";
import { apiClient } from "@/shared/api/apiClient";
import { toast } from "sonner";
import { userKeys } from "./userKeys";
import { t } from "i18next";

export const useAddWeightLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLog: WeightLogInput) => {
      const { data, error } = await apiClient.POST("/user/weight", {
        body: newLog,
      });
      console.log(
        "[MSW] POST /api/user/weight: Received new weight log",
        newLog,
      );
      if (error) throw error;
      return data;
    },
    onMutate: async (newLog) => {
      const queryKey = userKeys.details();
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<User>(queryKey);

      if (previousData) {
        const optimisticLog: WeightLog = {
          id: crypto.randomUUID(),
          ...newLog,
        };
        const newWeightHistory = [
          ...(previousData.weightHistory || []),
          optimisticLog,
        ];
        queryClient.setQueryData(queryKey, {
          ...previousData,
          weightHistory: newWeightHistory,
        });
      }

      return { previousData, queryKey };
    },
    onError: (_err, _newLog, onMutateResult) => {
      toast.error(t("common:notifications.addWeightError"));
      if (onMutateResult?.previousData) {
        queryClient.setQueryData(
          [onMutateResult?.queryKey],
          onMutateResult.previousData,
        );
      }
    },
    onSettled: (_newLog, _error, _variables, onMutateResult) =>
      queryClient.invalidateQueries({
        queryKey: [onMutateResult?.queryKey],
      }),
  });
};

export const useUpdateWeightLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: string; updatedLog: WeightLogInput }) => {
      const { data, error } = await apiClient.PUT("/user/weight/{id}", {
        params: { path: { id: params.id } },
        body: params.updatedLog,
      });
      if (error) throw error;
      return data;
    },
    onMutate: async (variables) => {
      const queryKey = userKeys.details();
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<User>(queryKey);

      if (previousData) {
        const newWeightHistory = previousData.weightHistory?.map((log) =>
          log.id === variables.id ? { ...log, ...variables.updatedLog } : log,
        );
        queryClient.setQueryData<User>(queryKey, {
          ...previousData,
          weightHistory: newWeightHistory,
        });
      }
      return { previousData, queryKey };
    },
    onError: (_err, _newData, onMutateResult) => {
      toast.error(t("common:notifications.updateUserDataError"));
      if (onMutateResult?.previousData) {
        queryClient.setQueryData(
          [onMutateResult?.queryKey],
          onMutateResult?.previousData,
        );
      }
    },
    onSuccess: () => {
      toast.success(t("common:notifications.updateUserDataSuccess"));
    },
    onSettled: (_newLog, _error, _variables, onMutateResult) =>
      queryClient.invalidateQueries({
        queryKey: [onMutateResult?.queryKey],
      }),
  });
};

export const useDeleteWeightLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: string }) => {
      const { data, error } = await apiClient.DELETE("/user/weight/{id}", {
        params: { path: { id: params.id } },
      });
      if (error) throw error;
      return data;
    },
    onMutate: async (variables) => {
      const queryKey = userKeys.details();

      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<User>(queryKey);

      if (previousData) {
        const newWeightHistory = previousData.weightHistory?.filter(
          (log) => log.id !== variables.id,
        );
        queryClient.setQueryData<User>(queryKey, {
          ...previousData,
          weightHistory: newWeightHistory,
        });
      }
      return { previousData, queryKey };
    },
    onError: (_err, _variables, onMutateResult) => {
      toast.error(t("common:notifications.deleteWeightError"));
      if (onMutateResult?.previousData) {
        queryClient.setQueryData(
          [onMutateResult?.queryKey],
          onMutateResult.previousData,
        );
      }
    },
    onSuccess: () => {
      toast.success(t("common:notifications.deletionSuccess"));
    },
    onSettled: (_newLog, _error, _variables, onMutateResult) =>
      queryClient.invalidateQueries({
        queryKey: [onMutateResult?.queryKey],
      }),
  });
};
