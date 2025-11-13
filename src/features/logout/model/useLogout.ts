import { auth } from "@/app/firebase/firebase.setup";
import { useSessionStore } from "@/entities/user";
import { useNavigate } from "@tanstack/react-router";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useLogout = () => {
  const clearSession = useSessionStore((state) => state.clearSession);
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  const handleLogout = async () => {
    if (import.meta.env.VITE_USE_MOCKS) {
      // MOCK LOGOUT
      clearSession();
      navigate({ to: "/auth", search: { tab: "login" }, replace: true });
    } else {
      // FIREBASE LOGOUT
      try {
        await signOut(auth);
        navigate({ to: "/auth", search: { tab: "login" }, replace: true });
      } catch (error) {
        console.error("Error during logout:", error);
        toast.error(t("common:notifications.errorSigningOut"));
      }
    }
  };

  return handleLogout;
};
