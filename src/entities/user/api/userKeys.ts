// Export from separate file to avoid circular dependencies
export const userKeys = {
  all: ["user"] as const,
  details: () => [...userKeys.all, "details"] as const,
};
