import { Button } from "@/shared/shadcn/components/ui/button";
import { useDayEditStore } from "../model/store";
import { Pencil } from "lucide-react";
import { useDateStore } from "@/shared/model";
import { useTranslation } from "react-i18next";

interface EditDayButtonProps {
  date: Date;
}

export const EditDayButton = (props: EditDayButtonProps) => {
  const { date } = props;
  const { t } = useTranslation("diary");
  const startEditing = useDayEditStore((state) => state.startEditing);
  const setSelectedDate = useDateStore((state) => state.setSelectedDate);

  const handleEdit = () => {
    startEditing();
    setSelectedDate(date);
  };

  return (
    <Button onClick={handleEdit} variant="outline">
      <Pencil className="size-4" />
      <span className="hidden sm:block">{t("diary:editDay.editDay")}</span>
    </Button>
  );
};
