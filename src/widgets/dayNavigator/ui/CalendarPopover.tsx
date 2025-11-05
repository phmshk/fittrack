import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/shadcn/components/ui/popover";
import { Calendar } from "@/shared/shadcn/components/ui/calendar";
import { useEffect, useState } from "react";
import { Button } from "@/shared/shadcn/components/ui/button";
import { useTranslation } from "react-i18next";
import type { Locale } from "date-fns";
import { enUS } from "date-fns/locale";

interface CalendarPopoverProps {
  date: Date;
  onDateChange: (newDate: Date) => void;
  additionalClasses?: string;
}

export const CalendarPopover = (props: CalendarPopoverProps) => {
  const [locale, setLocale] = useState<Locale>(enUS);
  const { date, onDateChange, additionalClasses } = props;
  const { t, i18n } = useTranslation("common");
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date) => {
    onDateChange(selectedDate);
    setCalendarOpen(false);
  };

  // Dynamically load locale based on current language
  useEffect(() => {
    const language = i18n.language;

    async function loadLocale() {
      if (language === "ru") {
        const { ru } = await import("date-fns/locale/ru");
        setLocale(ru);
        return;
      }
      if (language === "de") {
        const { de } = await import("date-fns/locale/de");
        setLocale(de);
        return;
      }
      if (language === "en") {
        setLocale(enUS);
        return;
      }
      console.warn(
        `Locale for language '${language}' not found, defaulting to enUS.`,
      );
      setLocale(enUS);
    }
    loadLocale();
  }, [i18n.language]);

  return (
    <div className={additionalClasses}>
      <Popover open={isCalendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <CalendarIcon className="h-4 w-4" />
            <span className="hidden sm:inline">
              {t("common:actions.selectDate")}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            locale={locale}
            required
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
