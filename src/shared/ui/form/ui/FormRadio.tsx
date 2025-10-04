import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/shared/shadcn/components/ui/form";
import type { BaseFormProps } from "../types/formTypes";
import type { FieldValues } from "react-hook-form";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/shared/shadcn/components/ui/radio-group";

interface FormRadioProps<T extends FieldValues> extends BaseFormProps<T> {
  type?: string;
  options: { label: string; value: string }[];
  groupClassName: string;
  itemClassName: string;
  labelClassName: string;
}

export const FormRadio = <T extends FieldValues>(props: FormRadioProps<T>) => {
  const {
    control,
    name,
    label,
    srOnly,
    description,
    options,
    groupClassName,
    itemClassName,
    labelClassName,
  } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={groupClassName}
            >
              {options.map((option) => (
                <FormItem key={option.value} className={itemClassName}>
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className={labelClassName}>
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormDescription>
            {description ?? description}
            {<span className="sr-only">{srOnly}</span>}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
