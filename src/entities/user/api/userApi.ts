import { apiClient } from "@/shared/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { UserGoals, UserGoalsInput } from "../model/types";

// --- Keys for user profile and goals ---
export const userGoalsKeys = {
  all: ["user-goals"] as const,
  details: () => [...userGoalsKeys.all, "details"] as const,
};

// --- Hooks for fetching user goals ---
export const useGetUserGoals = () => {
  return useQuery({
    queryKey: userGoalsKeys.details(),
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/user-goals");
      if (error) throw error;
      return data;
    },
  });
};

/// --- Hooks for updating user goals ---
export const useUpdateUserGoals = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedGoals: UserGoalsInput) => {
      const { data, error } = await apiClient.PUT("/user-goals", {
        body: updatedGoals,
      });

      if (error) throw error;
      return data;
    },
    onMutate: async (newGoals) => {
      const queryKey = userGoalsKeys.details();
      await queryClient.cancelQueries({ queryKey });

      const previousGoals = queryClient.getQueryData<UserGoals>(queryKey);

      queryClient.setQueryData<UserGoals>(queryKey, (old) =>
        old ? { ...old, ...newGoals } : undefined,
      );

      return { previousGoals, queryKey };
    },
    onError: (err, newGoals, onMutateResult) => {
      toast.error("Error updating user goals");
      queryClient.setQueryData(
        [onMutateResult?.queryKey],
        onMutateResult?.previousGoals,
      );
    },
    onSuccess: () => {
      toast.success("Goals updated successfully!");
    },
    onSettled: (newLog, error, variables, onMutateResult) =>
      queryClient.invalidateQueries({
        queryKey: [onMutateResult?.queryKey],
      }),
  });
};
