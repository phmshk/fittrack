import { useForm } from "react-hook-form";
import { formSchema, type FormOutput } from "../model/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Form } from "@/shared/shadcn/components/ui/form";
import { FormSelect } from "./FormSelect";
import { FormInput } from "./FormInput";
import { MEAL_TYPE } from "@/entities/day";
import { Button } from "@/shared/shadcn/components/ui/button";
import { FORM_INPUT_ITEMS } from "../model/formInputFields";

interface FoodFormProps {
  onSubmit: (data: FormOutput) => void;
  initialData?: Partial<FormOutput>;
  submitText?: string;
}

export const FoodForm = (props: FoodFormProps) => {
  const { onSubmit, initialData, submitText = "Save" } = props;

  const form = useForm<FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mealType: initialData?.mealType,
      foodName: initialData?.foodName || "",
      calories: initialData?.calories || "",
      proteins: initialData?.proteins || "",
      carbs: initialData?.carbs || "",
      fats: initialData?.fats || "",
      grams: initialData?.grams || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormSelect
          control={form.control}
          name="mealType"
          label="Meal Type"
          options={[...MEAL_TYPE]}
          placeholder="Select a meal type"
          srOnly="Select a meal type"
        />
        {FORM_INPUT_ITEMS.map((item) => (
          <FormInput key={item.name} control={form.control} {...item} />
        ))}
        <Button className="ml-auto block w-fit cursor-pointer" type="submit">
          {submitText}
        </Button>
      </form>
    </Form>
  );
};
