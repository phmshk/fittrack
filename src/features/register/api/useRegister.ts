import { useSessionStore } from "@/entities/user";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiComponents } from "@/shared/api/schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { toast } from "sonner";

//Firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/app/firebase/firebase.setup";
import { getFirebaseAuthErrorMessage } from "@/features/login";

type RegisterRequest = ApiComponents["schemas"]["RegisterRequest"];

type ApiError = {
  status?: number;
  message: string;
};

export const useRegister = () => {
  const setSession = useSessionStore((state) => state.setSession);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: RegisterRequest) => {
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        //MOCK REGISTER
        const { data, error } = await apiClient.POST("/auth/register", {
          body: credentials,
        });
        if (error) throw error;
        return data;
      } else {
        //FIREBASE REGISTER
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password,
        );
        await updateProfile(userCredential.user, {
          displayName: credentials.name,
        });
        return null;
      }
    },
    onSuccess: (data) => {
      if (import.meta.env.VITE_USE_MOCKS === "true" && data) {
        setSession(data);
      }
      toast.success(t("common:notifications.registrationSuccess"));
      navigate({ to: "/setup", replace: true });
    },
    onError: (error: ApiError) => {
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        toast.error(
          error.message || t("common:notifications.registrationError"),
        );
      } else {
        toast.error(getFirebaseAuthErrorMessage(error));
      }
    },
  });
};
