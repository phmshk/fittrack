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

/**
 * Formates an object into a flattened object with dot notation keys for Firebase updates.
 * @param obj The object to flatten.
 * @param result The resulting flattened object.
 * @returns A flattened object with dot notation keys.
 */

export const formatObjectForFirebase = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
  oldKey?: string,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flattened: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const newKey = oldKey ? `${oldKey}.${key}` : key;

    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    ) {
      Object.assign(flattened, formatObjectForFirebase(value, newKey));
    } else {
      flattened[newKey] = value;
    }
  });

  return flattened;
};
