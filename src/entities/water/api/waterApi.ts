import { apiClient } from "@/shared/api/apiClient";
import { formatDateForApi } from "@/shared/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { WaterLog, WaterLogInput } from "../model/types";
import { toast } from "sonner";
import { t } from "i18next";
import { auth, db } from "@/app/firebase/firebase.setup";
import { doc, getDoc, setDoc } from "firebase/firestore";

const waterKeys = {
  all: ["water-logs"] as const,
  lists: () => [...waterKeys.all, "list"] as const,
  list: (date: string) => [...waterKeys.lists(), { date }] as const,
};

export const useGetWaterByDate = (date: Date) => {
  const dateString = formatDateForApi(date);
  const isDateToday = date.toDateString() === new Date().toDateString();
  return useQuery({
    queryKey: waterKeys.list(dateString),
    queryFn: async () => {
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        // MOCKED VERSION
        const { data, error } = await apiClient.GET(`/water-logs/{date}`, {
          params: { path: { date: dateString } },
        });
        if (error) throw error;
        return data ? data : null;
      } else {
        //FIREBASE VERSION
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const logDocRef = doc(db, "users", user.uid, "waterLogs", dateString);
        const snapshot = await getDoc(logDocRef);
        const data = snapshot.data();

        if (snapshot.exists()) {
          return {
            id: snapshot.id,
            date: snapshot.id,
            amount: data?.amount || 0,
          } as WaterLog;
        }
        return null;
      }
    },
    staleTime: isDateToday ? 0 : Infinity,
  });
};

export const useSetWaterLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (logInput: WaterLogInput) => {
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        // MSW LOGIC
        const { data: existing } = await apiClient.GET(`/water-logs/{date}`, {
          params: { path: { date: logInput.date } },
        });

        if (existing) {
          const { data, error } = await apiClient.PUT(`/water-logs/{id}`, {
            params: { path: { id: existing.id } },
            body: logInput,
          });
          if (error) throw error;
          return data;
        } else {
          const { data, error } = await apiClient.POST("/water-logs", {
            body: logInput,
          });
          if (error) throw error;
          return data;
        }
      } else {
        // FIREBASE LOGIC
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const logDocRef = doc(
          db,
          "users",
          user.uid,
          "waterLogs",
          logInput.date,
        );

        const dataToSave = { amount: logInput.amount };

        await setDoc(logDocRef, dataToSave, { merge: true });
        console.log("Water log saved to Firebase:", dataToSave);
        return {
          id: logInput.date,
          date: logInput.date,
          amount: logInput.amount,
        } as WaterLog;
      }
    },
    onMutate: async (newLog) => {
      const queryKey = waterKeys.list(newLog.date);

      await queryClient.cancelQueries({ queryKey });

      const previousLog = queryClient.getQueryData<WaterLog | null>(queryKey);

      const optimisticLog: WaterLog = {
        id: newLog.date,
        date: newLog.date,
        amount: newLog.amount,
      };

      queryClient.setQueryData<WaterLog | null>(queryKey, optimisticLog);
      return { previousLog, queryKey };
    },
    onError: (_err, _newLog, onMutateResult) => {
      toast.error(t("common:notifications.errorUpdatingWaterLog"));
      if (onMutateResult?.queryKey) {
        queryClient.setQueryData(
          onMutateResult.queryKey,
          onMutateResult.previousLog,
        );
      }
    },

    onSettled: (_data, _error, _variables, onMutateResult) => {
      queryClient.invalidateQueries({ queryKey: onMutateResult?.queryKey });
    },
  });
};
