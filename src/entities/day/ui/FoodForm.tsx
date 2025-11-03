import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/shadcn/components/ui/button";
import { formatDateForApi } from "@/shared/lib/utils";
import { formSchema, type FormOutput } from "../model/zodFoodSchema";
import { MEALS } from "../model/types";
import { FormInput, FormSelect } from "@/shared/ui/form";
import { useTranslation } from "react-i18next";
import { FieldGroup } from "@/shared/shadcn/components/ui/field";
import { FORM_INPUT_ITEMS } from "../model/formInputFields";

interface FoodFormProps {
  submitText?: string;
  initialData?: Partial<FormOutput>;
  onSubmit: (data: FormOutput) => void;
}

export const FoodForm = (props: FoodFormProps) => {
  const { submitText, initialData, onSubmit } = props;
  const { t } = useTranslation(["nutrition", "food"]);

  const form = useForm<FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mealType: undefined,
      name: "",
      calories: "",
      proteins: "",
      carbs: "",
      sugars: "",
      fats: "",
      saturatedFats: "",
      grams: "",
      date: formatDateForApi(new Date()),
      ...initialData,
    },
  });

  const mealOptions = Object.values(MEALS).map((meal) => ({
    value: meal,
    label: t(`nutrition:meals.${meal}`),
  }));

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
      id="add-food-form"
    >
      <FieldGroup>
        <FormSelect
          control={form.control}
          name="mealType"
          label={t("food:addFoodFormFields.mealType")}
          options={mealOptions}
          placeholder={t("food:addFoodFormFields.mealTypePlaceholder")}
          srOnly={t("food:addFoodFormFields.srMealType")}
        />
        {FORM_INPUT_ITEMS.map((item) => (
          <FormInput
            key={item.name}
            control={form.control}
            name={item.name}
            label={t(`food:addFoodFormFields.${item.name}`)}
            placeholder={t(`food:addFoodFormFields.${item.name}Placeholder`)}
            srOnly={t(
              `food:addFoodFormFields.sr${item.name.charAt(0).toUpperCase() + item.name.slice(1)}`,
            )}
          />
        ))}
      </FieldGroup>
      <Button className="ml-auto block w-fit cursor-pointer" type="submit">
        {submitText}
      </Button>
    </form>
  );
};
