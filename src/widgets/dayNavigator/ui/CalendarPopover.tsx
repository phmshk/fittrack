import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/shadcn/components/ui/popover";
import { Calendar } from "@/shared/shadcn/components/ui/calendar";
import { useState } from "react";
import { Button } from "@/shared/shadcn/components/ui/button";

interface CalendarPopoverProps {
  date: Date;
  onDateChange: (newDate: Date) => void;
  additionalClasses?: string;
}

export const CalendarPopover = (props: CalendarPopoverProps) => {
  const { date, onDateChange, additionalClasses } = props;
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date) => {
    onDateChange(selectedDate);
    setCalendarOpen(false);
  };
  return (
    <div className={additionalClasses}>
      <Popover open={isCalendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <CalendarIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Select Date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            required
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
