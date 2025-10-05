import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/shadcn/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { goals } from "../model/types";
import { useFormContext } from "react-hook-form";

export const Goals = () => {
  const { control } = useFormContext();

  return (
    <div className="animate-in fade-in-20 space-y-6">
      <div className="space-y-2">
        <FormField
          control={control}
          name="goal"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold">
                What is your goal?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col sm:flex-row sm:gap-4"
                >
                  {goals.map((goal) => (
                    <FormItem key={goal.value} className="flex-1">
                      <FormControl>
                        <RadioGroupItem
                          value={goal.value!}
                          className="sr-only"
                        />
                      </FormControl>
                      <FormLabel
                        className={`flex cursor-pointer flex-col items-start rounded-lg border-2 p-4 ${
                          field.value === goal.value
                            ? "border-secondary bg-secondary"
                            : "border-muted"
                        }`}
                      >
                        <span className="mx-auto font-bold">{goal.label}</span>
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
    </div>
  );
};
