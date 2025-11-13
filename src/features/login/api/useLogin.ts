import { useSessionStore, type UserSession } from "@/entities/user";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiComponents } from "@/shared/api/schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { toast } from "sonner";

// Firebase
import { getFirebaseAuthErrorMessage } from "./firebaseErrors";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password,
        );
        const user = userCredential.user;
        const token = await user.getIdToken();
        const session: UserSession = {
          accessToken: token,
          refreshToken: user.refreshToken,
          user: {
            id: user.uid,
            email: user.email || "",
            name: user.displayName || "",
          },
        };
        return session;
      }
    },
    onSuccess: (data) => {
      if (data) {
        console.log("Login successful, setting session");
        setSession(data);
        toast.success(t("common:notifications.loginSuccess"));
        navigate({ to: "/", replace: true });
      }
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
