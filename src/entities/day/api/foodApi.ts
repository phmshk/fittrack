import { apiClient } from "@/shared/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDateForApi } from "@/shared/lib/utils";
import type { FoodLog } from "../model/types";
import { toast } from "sonner";
import { calculateFinalNutrientsValues } from "../lib/helpers";
import type { FormOutput } from "../model/zodFoodSchema";
import { t } from "i18next";
import { auth, db } from "@/app/firebase/firebase.setup";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";

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
  const isDateToday = date.toDateString() === new Date().toDateString();

  return useQuery({
    queryKey: foodKeys.list(dateString),
    queryFn: async () => {
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        // MOCKED VERSION
        const { data, error } = await apiClient.GET("/food-logs/{date}", {
          params: {
            path: { date: dateString },
          },
        });

        if (error) throw error;
        return data;
      } else {
        // FIREBASE VERSION
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const foodLogsCollection = collection(
          db,
          "users",
          user.uid,
          "foodLogs",
        );

        const q = query(foodLogsCollection, where("date", "==", dateString));
        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => ({
          id: doc.id,
          date:
            doc.data().date instanceof Timestamp
              ? formatDateForApi(doc.data().date.toDate())
              : doc.data().date,
          ...doc.data(),
        })) as FoodLog[];
      }
    },
    staleTime: isDateToday ? 0 : Infinity,
  });
};

export const useGetFoodsByDateRange = (params: { from: Date; to: Date }) => {
  const { from, to } = params;
  const fromString = formatDateForApi(from);
  const toString = formatDateForApi(to);

  return useQuery({
    queryKey: foodKeys.list({ from: fromString, to: toString }),
    queryFn: async () => {
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        // MOCKED VERSION
        const { data, error } = await apiClient.GET("/food-logs", {
          params: {
            query: {
              from: fromString,
              to: toString,
            },
          },
        });

        if (error) throw error;
        return data || [];
      } else {
        // FIREBASE VERSION
        const user = auth.currentUser;

        if (!user) throw new Error("User not authenticated");

        const foodLogsCollection = collection(
          db,
          "users",
          user.uid,
          "foodLogs",
        );

        const q = query(
          foodLogsCollection,
          where("date", ">=", fromString),
          where("date", "<=", toString),
        );
        const snapshot = await getDocs(q);

        console.log(
          "Fetched food logs for date range:",
          fromString,
          "to",
          toString,
        ); // Debug log

        return snapshot.docs.map((doc) => ({
          id: doc.id,
          date:
            doc.data().date instanceof Timestamp
              ? formatDateForApi(doc.data().date.toDate())
              : doc.data().date,
          ...doc.data(),
        })) as FoodLog[];
      }
    },
    enabled: !!(from && to),
  });
};

export const useAddFoodLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLog: FormOutput) => {
      const finalLog = calculateFinalNutrientsValues(newLog);
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        // MOCKED VERSION
        const { data, error } = await apiClient.POST("/food-logs", {
          body: finalLog,
        });
        if (error) throw error;
        return data;
      } else {
        // FIREBASE VERSION
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const foodLogsCollection = collection(
          db,
          "users",
          user.uid,
          "foodLogs",
        );
        console.log("Added food log", finalLog); // Debug log

        const docRef = await addDoc(foodLogsCollection, finalLog);
        return {
          id: docRef.id,
          ...finalLog,
        } as FoodLog;
      }
    },
    onMutate: async (newLog) => {
      const finalLog = calculateFinalNutrientsValues(newLog);
      const queryKey = foodKeys.list(finalLog.date);

      await queryClient.cancelQueries({ queryKey });

      const previousLogs = queryClient.getQueryData<FoodLog[]>(queryKey) || [];

      const optimisticLog: FoodLog = {
        ...finalLog,
        id: crypto.randomUUID(),
      };

      queryClient.setQueryData<FoodLog[]>(queryKey, (old) => [
        ...(old || []),
        optimisticLog,
      ]);

      return { previousLogs, queryKey, optimisticLog };
    },

    onError: (err, _newLog, onMutateResult) => {
      toast.error(t("common:notifications.addFoodError"));
      console.error("Add food log error:", err);
      if (onMutateResult?.queryKey) {
        queryClient.setQueryData(
          onMutateResult?.queryKey,
          onMutateResult?.previousLogs,
        );
      }
    },

    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: foodKeys.lists(),
      }),
  });
};

export const useUpdateFoodLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; updatedLog: FormOutput }) => {
      const finalLog = calculateFinalNutrientsValues(params.updatedLog);
      const { id } = params;
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        // MOCKED VERSION
        const { data, error } = await apiClient.PUT("/food-logs/{id}", {
          params: { path: { id } },
          body: finalLog,
        });
        if (error) throw error;
        return data;
      } else {
        // FIREBASE VERSION
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const logDocRef = doc(db, "users", user.uid, "foodLogs", id);
        await setDoc(logDocRef, finalLog, { merge: true });
        return {
          id,
          ...finalLog,
        } as FoodLog;
      }
    },

    onMutate: async (newLog) => {
      const finalLog = {
        id: newLog.id,
        ...calculateFinalNutrientsValues(newLog.updatedLog),
      };
      const queryKey = foodKeys.list(finalLog.date);

      await queryClient.cancelQueries({ queryKey });

      const previousLogs = queryClient.getQueryData<FoodLog[]>(queryKey) || [];

      queryClient.setQueryData<FoodLog[]>(queryKey, (old) =>
        old
          ? old.map((log) =>
              log.id === finalLog.id ? { ...log, ...finalLog } : log,
            )
          : [],
      );

      return { previousLogs, newLog, queryKey };
    },

    onError: (_err, _newLog, onMutateResult) => {
      toast.error(t("common:notifications.updateFoodError"));
      if (onMutateResult?.queryKey) {
        queryClient.setQueryData(
          onMutateResult?.queryKey,
          onMutateResult?.previousLogs,
        );
      }
    },

    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: foodKeys.lists(),
      }),
  });
};

export const useDeleteFoodLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; date: string }) => {
      const { id } = params;
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        // MOCKED VERSION
        const { error } = await apiClient.DELETE("/food-logs/{id}", {
          params: { path: { id } },
        });
        if (error) throw error;
      } else {
        // FIREBASE VERSION
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const logDocRef = doc(db, "users", user.uid, "foodLogs", id);
        await deleteDoc(logDocRef);
      }
    },
    onMutate: async (newLog) => {
      const queryKey = foodKeys.list(newLog.date);

      await queryClient.cancelQueries({ queryKey });

      const previousLogs = queryClient.getQueryData<FoodLog[]>(queryKey) || [];

      queryClient.setQueryData<FoodLog[]>(queryKey, (old) =>
        old ? old.filter((log) => log.id !== newLog.id) : [],
      );

      return { previousLogs, queryKey };
    },
    onError: (_err, _newLog, onMutateResult) => {
      toast.error(t("common:notifications.deleteFoodError"));
      if (onMutateResult?.queryKey) {
        queryClient.setQueryData(
          onMutateResult?.queryKey,
          onMutateResult?.previousLogs,
        );
      }
    },
    onSuccess: () => toast.success(t("common:notifications.deletionSuccess")),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: foodKeys.lists(),
      }),
  });
};
