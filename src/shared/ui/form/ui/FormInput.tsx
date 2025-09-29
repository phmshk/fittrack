import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/shared/shadcn/components/ui/form";
import { Input } from "@/shared/shadcn/components/ui/input";
import type { BaseFormProps } from "../types/formTypes";
import type { FieldValues } from "react-hook-form";

interface FormInputProps<T extends FieldValues> extends BaseFormProps<T> {
  type?: string;
}

export const FormInput = <T extends FieldValues>(props: FormInputProps<T>) => {
  const { control, name, label, placeholder, srOnly, type = "text" } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormDescription className="sr-only">{srOnly}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
