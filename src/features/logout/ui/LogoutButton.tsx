import { useSessionStore } from "@/entities/user";
import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/shadcn/components/ui/tooltip";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
  const clearSession = useSessionStore((state) => state.clearSession);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    navigate({ to: "/auth", search: { tab: "login" }, replace: true });
    console.log("User logged out and redirected to /auth");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Logout</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Logout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
