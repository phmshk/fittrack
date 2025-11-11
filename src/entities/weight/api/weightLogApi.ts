import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import { toast } from "sonner";
import { t } from "i18next";
import type {
  User,
  WeightLog,
  WeightLogInput,
} from "@/entities/user/model/types";
import { userKeys } from "@/entities/user/api/userKeys";
import { auth, db } from "@/app/firebase/firebase.setup";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";

export const weightLogKeys = {
  all: () => ["weightLogs"] as const,
};

export const useGetWeightLogs = () => {
  return useQuery({
    queryKey: weightLogKeys.all(),
    queryFn: async (): Promise<WeightLog[]> => {
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        // MOCKED RESPONSE
        const { data, error } = await apiClient.GET("/user");
        console.log("[MSW] GET /api/user/weight: Fetched weight logs", data);
        if (error) throw error;
        return data.weightHistory || [];
      } else {
        // FIREBASE RESPONSE
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const weightLogsCollection = collection(
          db,
          "users",
          user.uid,
          "weightLogs",
        );
        const q = query(weightLogsCollection);
        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as WeightLog[];
      }
    },
  });
};

export const useAddWeightLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLog: WeightLogInput) => {
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        // MOCKED ADD LOG
        const { data, error } = await apiClient.POST("/user/weight", {
          body: newLog,
        });
        console.log(
          "[MSW] POST /api/user/weight: Received new weight log",
          newLog,
        );
        if (error) throw error;
        return data;
      } else {
        // FIREBASE ADD LOG
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const weightLogsCollection = collection(
          db,
          "users",
          user.uid,
          "weightLogs",
        );

        const docRef = await addDoc(weightLogsCollection, newLog);
        return docRef;
      }
    },
    onMutate: async (newLog) => {
      if (import.meta.env.VITE_USE_MOCKS === "true") {
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
      } else {
        const queryKey = weightLogKeys.all();
        await queryClient.cancelQueries({ queryKey });

        const previousData = queryClient.getQueryData<WeightLog[]>(queryKey);

        const optimisticLog: WeightLog = {
          id: crypto.randomUUID(),
          ...newLog,
        };

        queryClient.setQueryData<WeightLog[]>(queryKey, (oldLogs = []) => [
          ...oldLogs,
          optimisticLog,
        ]);

        return { previousData, queryKey };
      }
    },
    onError: (_err, _newLog, onMutateResult) => {
      toast.error(t("common:notifications.addWeightError"));
      if (onMutateResult?.previousData) {
        queryClient.setQueryData(
          onMutateResult?.queryKey,
          onMutateResult.previousData,
        );
      }
    },
    onSettled: (_newLog, _error, _variables, onMutateResult) =>
      queryClient.invalidateQueries({
        queryKey: onMutateResult?.queryKey,
      }),
  });
};

export const useUpdateWeightLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: string; updatedLog: WeightLogInput }) => {
      // MOCKED UPDATE LOG
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        const { data, error } = await apiClient.PUT("/user/weight/{id}", {
          params: { path: { id: params.id } },
          body: params.updatedLog,
        });
        if (error) throw error;
        return data;
      } else {
        // FIREBASE UPDATE LOG
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const logDocRef = doc(db, "users", user.uid, "weightLogs", params.id);
        await setDoc(logDocRef, params.updatedLog, { merge: true });
      }
    },
    onMutate: async (variables) => {
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        // MOCKED OPTIMISTIC UPDATE
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
      } else {
        // FIREBASE OPTIMISTIC UPDATE
        const queryKey = weightLogKeys.all();
        await queryClient.cancelQueries({ queryKey });

        const previousData = queryClient.getQueryData<WeightLog[]>(queryKey);
        queryClient.setQueryData<WeightLog[]>(queryKey, (oldLogs = []) =>
          oldLogs.map((log) =>
            log.id === variables.id ? { ...log, ...variables.updatedLog } : log,
          ),
        );

        return { previousData, queryKey };
      }
    },
    onError: (_err, _newData, onMutateResult) => {
      toast.error(t("common:notifications.updateUserDataError"));
      if (onMutateResult?.previousData) {
        queryClient.setQueryData(
          onMutateResult?.queryKey,
          onMutateResult?.previousData,
        );
      }
    },
    onSettled: (_newLog, _error, _variables, onMutateResult) =>
      queryClient.invalidateQueries({
        queryKey: onMutateResult?.queryKey,
      }),
  });
};

export const useDeleteWeightLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: string }) => {
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        // MOCKED DELETE LOG
        const { data, error } = await apiClient.DELETE("/user/weight/{id}", {
          params: { path: { id: params.id } },
        });
        if (error) throw error;
        return data;
      } else {
        // FIREBASE DELETE LOG
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const logDocRef = doc(db, "users", user.uid, "weightLogs", params.id);
        await deleteDoc(logDocRef);
      }
    },
    onMutate: async (variables) => {
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        // MOCKED OPTIMISTIC UPDATE
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
      } else {
        // FIREBASE OPTIMISTIC UPDATE
        const queryKey = weightLogKeys.all();
        await queryClient.cancelQueries({ queryKey });

        const previousData = queryClient.getQueryData<WeightLog[]>(queryKey);
        queryClient.setQueryData<WeightLog[]>(queryKey, (oldLogs = []) =>
          oldLogs.filter((log) => log.id !== variables.id),
        );

        return { previousData, queryKey };
      }
    },
    onError: (_err, _variables, onMutateResult) => {
      toast.error(t("common:notifications.deleteWeightError"));
      if (onMutateResult?.previousData) {
        queryClient.setQueryData(
          onMutateResult?.queryKey,
          onMutateResult.previousData,
        );
      }
    },
    onSuccess: () => {
      toast.success(t("common:notifications.deletionSuccess"));
    },
    onSettled: (_newLog, _error, _variables, onMutateResult) =>
      queryClient.invalidateQueries({
        queryKey: onMutateResult?.queryKey,
      }),
  });
};
