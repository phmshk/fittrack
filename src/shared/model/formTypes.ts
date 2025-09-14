import type { Control, FieldValues, Path } from "react-hook-form";

export interface BaseFormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  srOnly: string;
}
