import { useSessionStore } from "@/entities/user";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiComponents } from "@/shared/api/schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

type LoginRequest = ApiComponents["schemas"]["LoginRequest"];

export const useLogin = () => {
  const setSession = useSessionStore((state) => state.setSession);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const { data, error } = await apiClient.POST("/auth/login", {
        body: credentials,
      });
      if (error) throw error;

      return data;
    },
    onSuccess: (data) => {
      setSession(data);
      toast.success("Welcome back!");
      navigate({ to: "/", replace: true });
    },
    onError: () => {
      toast.error("Invalid email or password. Please try again.");
    },
  });
};
