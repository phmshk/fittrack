import { Button } from "@/shared/shadcn/components/ui/button";
import { useDayEditStore } from "../model/store";
import { Save } from "lucide-react";

export const SaveDayButton = () => {
  const stopEditing = useDayEditStore((state) => state.stopEditing);
  const handleClick = () => {
    stopEditing();
  };

  return (
    <Button onClick={handleClick} variant="outline">
      <Save className="size-4" />
      <span className="hidden sm:block">Save changes</span>
    </Button>
  );
};
