import { CalendarPopover } from "./CalendarPopover";
import { DaySelect } from "./DaySelect";

interface DayNavigatorProps {
  date: Date;
  onDateChange: (newDate: Date) => void;
  locale?: string;
}

export const DayNavigator = (props: DayNavigatorProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <DaySelect {...props} />
      <CalendarPopover {...props} />
    </div>
  );
};
