import { apiClient } from "@/shared/api/apiClient";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UndefinedInitialDataOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";
import type { User } from "../model/types";
import { useSessionStore } from "../model/useSession";
import { prepareUpdatePayload } from "../lib/helpers";
import { useAddWeightLog } from "../../weight/api/weightLogApi";
import { t } from "i18next";
import { userKeys } from "./userKeys";

const fetchUserData = async (): Promise<User> => {
  const { data, error } = await apiClient.GET("/user");
  if (error) throw error;
  return data;
};

export const userQueryOptions: UndefinedInitialDataOptions<User> = {
  queryKey: userKeys.details(),
  queryFn: fetchUserData,
};

// --- Hook for fetching user data ---
export const useGetUserData = () => {
  const { isAuthenticated } = useSessionStore.getState();
  return useQuery({
    ...userQueryOptions,
    enabled: isAuthenticated,
  });
};

// --- Hook for updating user data ---
export const useUpdateUserData = () => {
  const queryClient = useQueryClient();
  const { mutate: addWeightLog } = useAddWeightLog();

  return useMutation({
    mutationFn: async (updatedData: Partial<User>) => {
      //Fetch current user data to merge with updates
      const currentUserData = queryClient.getQueryData<User>(
        userKeys.details(),
      );

      if (!currentUserData) {
        throw new Error("No user data available to update");
      }

      const { payload, newWeightLog } = prepareUpdatePayload({
        currentUserData,
        updatedData,
      });

      if (newWeightLog) {
        addWeightLog(newWeightLog);
      }

      if (Object.keys(payload).length === 0) {
        console.log(
          "[MSW] PUT /api/user: No changes detected, skipping update",
        );
        return currentUserData;
      }

      const { data, error } = await apiClient.PUT("/user", {
        body: payload,
      });

      console.log("[MSW] PUT /api/user: Received update request", updatedData);
      if (error) throw error;
      return data;
    },
    onMutate: async (newData) => {
      const queryKey = userKeys.details();
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<User>(queryKey);

      queryClient.setQueryData<User>(queryKey, (old) => {
        if (!old) return undefined;
        const updatedUser = {
          ...old,
          // Merge top-level fields
          ...(newData.name !== undefined && { name: newData.name }),
          ...(newData.goal !== undefined && { goal: newData.goal }),
          ...(newData.activityLevel !== undefined && {
            activityLevel: newData.activityLevel,
          }),
          // Merge personalData fields
          personalData: newData.personalData
            ? {
                ...old?.personalData,
                ...newData.personalData,
              }
            : old?.personalData,
        };
        return updatedUser;
      });

      const sessionUser = useSessionStore.getState().user;
      if (sessionUser) {
        useSessionStore.setState({
          user: { ...sessionUser, ...newData },
        });
      }

      return { previousData, queryKey };
    },
    onError: (_err, _newData, onMutateResult) => {
      toast.error(t("common:notifications.updateUserDataError"));
      queryClient.setQueryData(
        [onMutateResult?.queryKey],
        onMutateResult?.previousData,
      );
    },
    onSuccess: () => {
      toast.success(t("common:notifications.updateUserDataSuccess"));
    },
    onSettled: (_newLog, _error, _variables, onMutateResult) =>
      queryClient.invalidateQueries({
        queryKey: onMutateResult?.queryKey,
      }),
  });
};
