import { useSessionStore, type UserSession } from "@/entities/user";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiComponents } from "@/shared/api/schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { toast } from "sonner";

//Firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/app/firebase/firebase.setup";
import { getFirebaseAuthErrorMessage } from "@/features/login";
import { doc, setDoc } from "firebase/firestore";

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
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: credentials.name,
        });

        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          id: user.uid,
          name: credentials.name,
          email: credentials.email,
          hasCompletedSetup: false,
          personalData: {},
          dailyTargets: {},
          weightHistory: [],
          activityLevel: "sedentary",
          goal: "maintain_weight",
        });

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
        setSession(data);
        toast.success(t("common:notifications.registrationSuccess"));
        navigate({ to: "/setup", replace: true });
      }
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
