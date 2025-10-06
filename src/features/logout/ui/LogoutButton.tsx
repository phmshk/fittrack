import { Button } from "@/shared/shadcn/components/ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "../model/useLogout";

export const LogoutButton = () => {
  const handleLogout = useLogout();

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className="w-full justify-start hover:bg-inherit"
    >
      <LogOut className="text-destructive h-4 w-4" />
      Logout
      <span className="sr-only">Logout</span>
    </Button>
  );
};
