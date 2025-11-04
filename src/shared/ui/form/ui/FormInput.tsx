import { Input } from "@/shared/shadcn/components/ui/input";
import type { BaseFormProps } from "../types/formTypes";
import { Controller, type FieldValues } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/shared/shadcn/components/ui/field";

interface FormInputProps<T extends FieldValues> extends BaseFormProps<T> {
  type?: string;
}

export const FormInput = <T extends FieldValues>(props: FormInputProps<T>) => {
  const {
    control,
    name,
    label,
    placeholder,
    srOnly,
    type = "text",
    description,
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`input-${name}`}>{label}</FieldLabel>
          <Input
            {...field}
            id={`input-${name}`}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            type={type}
          />
          <FieldDescription>
            {description ?? description}
            {<span className="sr-only">{srOnly}</span>}
          </FieldDescription>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
