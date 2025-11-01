import { Button } from "@/shared/shadcn/components/ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "../model/useLogout";
import { useTranslation } from "react-i18next";

export const LogoutButton = () => {
  const handleLogout = useLogout();
  const { t } = useTranslation("auth");

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className="w-full hover:bg-inherit"
    >
      <LogOut className="text-destructive h-4 w-4" />
      {t("auth:logout")}
      <span className="sr-only">{t("auth:logout")}</span>
    </Button>
  );
};
