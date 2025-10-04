import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/shadcn/components/ui/form";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/shared/shadcn/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { activityLevels } from "../model/types";

export const ActivityLevel = () => {
  const { control } = useFormContext();

  return (
    <div className="animate-in fade-in-20">
      <FormField
        control={control}
        name="activityLevel"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base font-semibold">
              What is your activity level?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 gap-4"
              >
                {activityLevels.map((level) => (
                  <FormItem key={level.value}>
                    <FormControl>
                      <RadioGroupItem
                        value={level.value!}
                        className="sr-only"
                      />
                    </FormControl>
                    <FormLabel
                      className={`flex cursor-pointer flex-col items-start rounded-lg border-2 p-4 ${
                        field.value === level.value
                          ? "border-secondary bg-secondary"
                          : "border-muted"
                      }`}
                    >
                      <span className="font-bold">{level.label}</span>
                      <span className="text-muted-foreground text-sm">
                        {level.description}
                      </span>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
