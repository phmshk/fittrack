import { Button } from "@/shared/shadcn/components/ui/button";
import { useDayEditStore } from "../model/store";
import { Save } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SaveDayButton = () => {
  const { t } = useTranslation("common");
  const stopEditing = useDayEditStore((state) => state.stopEditing);
  const handleClick = () => {
    stopEditing();
  };

  return (
    <Button onClick={handleClick} variant="outline">
      <Save className="size-4" />
      <span className="hidden sm:block">{t("common:actions.saveChanges")}</span>
    </Button>
  );
};
