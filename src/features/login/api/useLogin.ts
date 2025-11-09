import { useSessionStore } from "@/entities/user";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiComponents } from "@/shared/api/schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { toast } from "sonner";

// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebase.setup";
import { getFirebaseAuthErrorMessage } from "./firebaseErrors";

type LoginRequest = ApiComponents["schemas"]["LoginRequest"];

export const useLogin = () => {
  const setSession = useSessionStore((state) => state.setSession);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        //MOCK LOGIN
        const { data, error } = await apiClient.POST("/auth/login", {
          body: credentials,
        });
        if (error) throw error;

        return data;
      } else {
        //FIREBASE LOGIN
        await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password,
        );
        return null;
      }
    },
    onSuccess: (data) => {
      if (import.meta.env.VITE_USE_MOCKS === "true" && data) {
        setSession(data);
      }
      toast.success(t("common:notifications.loginSuccess"));
      navigate({ to: "/", replace: true });
    },
    onError: (error) => {
      if (import.meta.env.VITE_USE_MOCKS === "true") {
        // Clear any existing session on login error in mock mode
        toast.error(t("common:notifications.loginError"));
      } else {
        toast.error(getFirebaseAuthErrorMessage(error));
      }
    },
  });
};
