/**
 * Formats a Date object into a string suitable for API requests in the format YYYY-MM-DD.
 * @param date The Date object to format.
 * @returns A string representing the formatted date.
 */
export const formatDateForApi = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
