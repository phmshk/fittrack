import { Button } from "@/shared/shadcn/components/ui/button";
import { useForm } from "react-hook-form";
import { FORM_INPUT_ITEMS } from "../model/formInputFields";
import { formSchema } from "../model/zodSchema";
import { FormSelect } from "./FormSelect";
import { FormInput } from "./FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormOutput } from "../model/zodSchema";
import { Form } from "@/shared/shadcn/components/ui/form";
import { MEAL_TYPE, useDayStore } from "@/entities/day";

interface AddFoodFormProps {
  onClose: () => void;
}

export const AddFoodForm = ({ onClose }: AddFoodFormProps) => {
  const addFoodEntry = useDayStore((state) => state.addFoodEntry);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mealType: undefined,
      foodName: "",
      calories: "",
      proteins: "",
      carbs: "",
      fats: "",
      grams: "",
    },
  });

  const onSubmit = (data: FormOutput) => {
    const formattedData = {
      name: data.foodName,
      calories: Number(data.calories),
      proteins: Number(data.proteins),
      carbs: Number(data.carbs),
      fats: Number(data.fats),
      grams: data.grams ? Number(data.grams) : 100,
    };
    addFoodEntry(data.mealType, formattedData);
    form.reset();
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormSelect
          control={form.control}
          name="mealType"
          label="Meal Type"
          options={MEAL_TYPE as unknown as string[]}
          placeholder="Select a meal type"
          srOnly="Select a meal type"
        />
        {FORM_INPUT_ITEMS.map((item) => (
          <FormInput key={item.name} control={form.control} {...item} />
        ))}
        <Button className="ml-auto block w-fit cursor-pointer" type="submit">
          Add Food
        </Button>
      </form>
    </Form>
  );
};
