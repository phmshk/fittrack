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
import { FormInput } from "@/shared/ui/form";
import { useFormContext } from "react-hook-form";

export const PersonalInfo = () => {
  const { control } = useFormContext();

  return (
    <div className="animate-in space-y-4 fade-in-20">
      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Gender</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center">
                  <FormControl>
                    <RadioGroupItem value="male" />
                  </FormControl>
                  <FormLabel className="font-normal">Male</FormLabel>
                </FormItem>
                <FormItem className="flex items-center">
                  <FormControl>
                    <RadioGroupItem value="female" />
                  </FormControl>
                  <FormLabel className="font-normal">Female</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormInput
        control={control}
        name="age"
        label="Age"
        type="number"
        placeholder="e.g., 25"
        srOnly="Enter your age"
      />
      <FormInput
        control={control}
        name="height"
        label="Height (cm)"
        type="number"
        placeholder="e.g., 180"
        srOnly="Enter your height in centimeters"
      />
      <FormInput
        control={control}
        name="weight"
        label="Weight (kg)"
        type="number"
        placeholder="e.g., 75"
        srOnly="Enter your weight in kilograms"
      />
    </div>
  );
};
