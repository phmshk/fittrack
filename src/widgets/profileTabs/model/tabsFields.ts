import type { ProfileFormData } from "@/entities/user";

export const personalTabFields: Array<{
  label: string;
  name: keyof ProfileFormData;
  type: string;
}> = [
  { label: "Name", name: "name", type: "text" },
  { label: "Weight", name: "weight", type: "number" },
  { label: "Age", name: "age", type: "number" },
  { label: "Height", name: "height", type: "number" },
] as const;
