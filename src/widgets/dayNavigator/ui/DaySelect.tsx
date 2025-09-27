import { Button } from "@/shared/shadcn/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "../model/helpers/helpers";
import { H2 } from "@/shared/ui/headings";

interface DaySelectProps {
  date: Date;
  onDateChange: (newDate: Date) => void;
  locale?: string;
  additionalClasses?: string;
}

export const DaySelect = (props: DaySelectProps) => {
  const { date, onDateChange, locale, additionalClasses } = props;

  const handlePreviousDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    onDateChange(newDate);
  };

  return (
    <div
      className={`flex flex-1 items-center justify-between gap-2 text-nowrap ${additionalClasses}`}
    >
      <Button variant="outline" size="icon" onClick={handlePreviousDay}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <H2>{formatDate(date, locale)}</H2>
      <Button variant="outline" size="icon" onClick={handleNextDay}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
