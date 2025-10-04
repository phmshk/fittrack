import { useSessionStore } from "@/entities/user";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiComponents } from "@/shared/api/schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

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
      const { data, error } = await apiClient.POST("/auth/register", {
        body: credentials,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      setSession(data);
      toast.success("Account created successfully!");
      navigate({ to: "/setup", replace: true });
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Registration failed. Please try again.");
    },
  });
};
