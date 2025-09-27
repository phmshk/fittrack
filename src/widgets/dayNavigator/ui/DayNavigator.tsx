import { useDateStore } from "@/shared/model";
import { CalendarPopover } from "./CalendarPopover";
import { DaySelect } from "./DaySelect";
import {
  EditDayButton,
  SaveDayButton,
  useDayEditStore,
} from "@/features/editDay";

interface DayNavigatorProps {
  date: Date;
  onDateChange: (newDate: Date) => void;
  locale?: string;
}

export const DayNavigator = (props: DayNavigatorProps) => {
  const today = useDateStore((state) => state.today);
  const isEditing = useDayEditStore((state) => state.isEditing);

  const notToday = props.date.toDateString() !== today.toDateString();
  const isPast = props.date < today;

  // Show Edit button only if the selected date is in the past and not currently being edited
  const renderButtons = () => {
    if (notToday && isPast && !isEditing) {
      return <EditDayButton date={props.date} />;
    }

    if (notToday && isPast && isEditing) {
      return <SaveDayButton />;
    }

    return null;
  };

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <DaySelect
        {...props}
        additionalClasses={`${isEditing ? "opacity-50 pointer-events-none" : ""}`}
      />
      {renderButtons()}
      <CalendarPopover
        {...props}
        additionalClasses={`${isEditing ? "opacity-50 pointer-events-none" : ""}`}
      />
    </div>
  );
};
