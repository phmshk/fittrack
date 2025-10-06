import { useSessionStore } from "@/entities/user";
import { useNavigate } from "@tanstack/react-router";

export const useLogout = () => {
  const clearSession = useSessionStore((state) => state.clearSession);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    navigate({ to: "/auth", search: { tab: "login" }, replace: true });
  };

  return handleLogout;
};
