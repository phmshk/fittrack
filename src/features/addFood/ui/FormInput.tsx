import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/shared/shadcn/components/ui/form";
import { Input } from "@/shared/shadcn/components/ui/input";
import type { FieldValues } from "react-hook-form";
import type { BaseFormProps } from "@/shared/model/formTypes";

type FormInputProps<T extends FieldValues> = BaseFormProps<T>;

export const FormInput = <T extends FieldValues>(props: FormInputProps<T>) => {
  const { control, name, label, placeholder, srOnly } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription className="sr-only">{srOnly}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
