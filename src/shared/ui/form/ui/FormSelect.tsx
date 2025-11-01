import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn/components/ui/select";
import { Controller, type FieldValues } from "react-hook-form";
import type { BaseFormProps } from "../types/formTypes";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/shared/shadcn/components/ui/field";

interface FormSelectProps<T extends FieldValues> extends BaseFormProps<T> {
  options: Array<{ value: string; label: string }>;
}

export const FormSelect = <T extends FieldValues>(
  props: FormSelectProps<T>,
) => {
  const { control, options, name, label, placeholder, srOnly } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel htmlFor={`select-${name}`}>{label}</FieldLabel>
            <FieldDescription className="sr-only">{srOnly}</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            name={field.name}
          >
            <SelectTrigger
              className="w-max cursor-pointer"
              aria-invalid={fieldState.invalid}
              id={`select-${name}`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="item-aligned">
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
};
