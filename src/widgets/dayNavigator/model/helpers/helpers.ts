import type { TFunction } from "i18next";

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const formatDate = (
  date: Date,
  locale: string = "en-US",
  t: TFunction,
): string => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (isSameDay(date, today)) return `${t("common:today")}`;

  return date.toLocaleDateString(locale, {
    month: "long",
    weekday: "short",
    day: "numeric",
  });
};
