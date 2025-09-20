import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/shadcn/components/ui/form";
import { Button } from "@/shared/shadcn/components/ui/button";

import { FormSelect } from "./FormSelect";
import { formSchema, type FormOutput } from "../model/zodSchema";
import { MEALS } from "@/entities/day";
import { FORM_INPUT_ITEMS } from "../model/formInputFields";
import { FormInput } from "./FormInput";
import { formatDateForApi } from "@/shared/utils";

interface FoodFormProps {
  submitText?: string;
  initialData?: Partial<FormOutput>;
  onSubmit: (data: FormOutput) => void;
}

export const FoodForm = (props: FoodFormProps) => {
  const { submitText = "Save Changes", initialData, onSubmit } = props;

  const form = useForm<FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mealType: undefined,
      name: "",
      calories: "",
      proteins: "",
      carbs: "",
      fats: "",
      grams: "",
      date: formatDateForApi(new Date()),
      ...initialData,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormSelect
          control={form.control}
          name="mealType"
          label="Meal Type"
          options={Object.keys(MEALS)}
          placeholder="Select a meal type"
          srOnly="Select a meal type"
        />
        {FORM_INPUT_ITEMS.map((item) => (
          <FormInput
            key={item.name}
            control={form.control}
            name={item.name}
            label={item.label}
            placeholder={item.placeholder}
            srOnly={item.srOnly}
          />
        ))}
        <Button className="ml-auto block w-fit cursor-pointer" type="submit">
          {submitText}
        </Button>
      </form>
    </Form>
  );
};
