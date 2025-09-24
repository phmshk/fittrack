import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/shared/shadcn/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn/components/ui/select";
import type { FieldValues } from "react-hook-form";
import type { BaseFormProps } from "../types/formTypes";

interface FormSelectProps<T extends FieldValues> extends BaseFormProps<T> {
  options: string[];
}

export const FormSelect = <T extends FieldValues>(
  props: FormSelectProps<T>,
) => {
  const { control, options, name, label, placeholder, srOnly } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="cursor-pointer">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option}
                  value={option.toLowerCase()}
                  className="cursor-pointer"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription className="sr-only">{srOnly}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
