import {
  Field,
  FieldError,
  FieldLabel,
} from "@/shared/shadcn/components/ui/field";
import { Input } from "@/shared/shadcn/components/ui/input";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface FormControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  isEditing: boolean;
}

export const FormController = <T extends FieldValues>(
  props: FormControllerProps<T>,
) => {
  const { name, control, isEditing } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
          </FieldLabel>
          {isEditing ? (
            <div>
              <Input
                id={field.name}
                type="text"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
                placeholder="Your name goes here"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          ) : (
            <p>{field.value}</p>
          )}
        </Field>
      )}
    />
  );
};
