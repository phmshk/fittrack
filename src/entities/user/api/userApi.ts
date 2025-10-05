import { apiClient } from "@/shared/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { User } from "../model/types";
import { useSessionStore } from "../model/useSession";

// --- Keys for user data ---
export const userKeys = {
  all: ["user"] as const,
  details: () => [...userKeys.all, "details"] as const,
};

// --- Hook for fetching user data ---
export const useGetUserData = () => {
  const { isAuthenticated } = useSessionStore.getState();
  return useQuery({
    queryKey: userKeys.details(),
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/user");
      if (error) throw error;
      return data;
    },
    enabled: isAuthenticated,
  });
};

// --- Hook for updating user data ---
export const useUpdateUserData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData: Partial<User>) => {
      const { data, error } = await apiClient.PUT("/user", {
        body: updatedData,
      });
      console.log("[MSW] PUT /api/user: Received update request", updatedData);
      if (error) throw error;
      return data;
    },
    onMutate: async (newData) => {
      const queryKey = userKeys.details();
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<User>(queryKey);

      queryClient.setQueryData<User>(queryKey, (old) =>
        old ? { ...old, ...newData } : undefined,
      );

      const sessionUser = useSessionStore.getState().user;
      if (sessionUser) {
        useSessionStore.setState({
          user: { ...sessionUser, ...newData },
        });
      }

      return { previousData, queryKey };
    },
    onError: (err, newData, onMutateResult) => {
      toast.error("Error updating user data");
      queryClient.setQueryData(
        [onMutateResult?.queryKey],
        onMutateResult?.previousData,
      );
    },
    onSuccess: () => {
      toast.success("User data updated successfully!");
    },
    onSettled: (newLog, error, variables, onMutateResult) =>
      queryClient.invalidateQueries({
        queryKey: [onMutateResult?.queryKey],
      }),
  });
};
