import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/shadcn/components/ui/field";
import { Input } from "@/shared/shadcn/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import {
  nutriGoalsSchema,
  type NutriGoalsFormValues,
} from "../model/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetUserData, useUpdateUserData } from "@/entities/user";
import { Spinner } from "@/shared/ui/spinner";
import { useTranslation } from "react-i18next";

const FORM_ID = "update-macros-and-calories-form";

export const UpdateMarcosAndCalories = () => {
  const { t } = useTranslation(["profile", "common", "nutrition"]);
  const { data: userData, isLoading: isLoadingUserData } = useGetUserData();
  const { mutate: updateUserData, isPending: isUpdatingUserData } =
    useUpdateUserData();

  const form = useForm<NutriGoalsFormValues>({
    resolver: zodResolver(nutriGoalsSchema),
    defaultValues: {
      calories: String(userData?.dailyTargets?.targetCalories) || "",
      proteins: String(userData?.dailyTargets?.targetProteins) || "",
      fats: String(userData?.dailyTargets?.targetFats) || "",
      carbohydrates: String(userData?.dailyTargets?.targetCarbs) || "",
      water: String(userData?.dailyTargets?.targetWaterIntake) || "",
    },
  });

  const onSubmit = (data: NutriGoalsFormValues) => {
    updateUserData({
      dailyTargets: {
        targetCalories: Number(data.calories),
        targetProteins: Number(data.proteins),
        targetFats: Number(data.fats),
        targetCarbs: Number(data.carbohydrates),
        targetWaterIntake: Number(data.water),
      },
    });
    form.reset(data);
  };

  if (isLoadingUserData) {
    return <Spinner text={t("common:loading")} />;
  }

  return (
    <Card className="h-full w-full border-none">
      <CardHeader>
        <CardTitle>{t("profile:tabs.goals.title")}</CardTitle>
        <CardDescription>
          {t("profile:tabs.goals.description")}
          <br />
          <span className="font-bold">{t("profile:tabs.goals.warning")}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Calorie Field */}
            <Controller
              name="calories"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${FORM_ID}-calories`}>
                    {t("nutrition:macronutrients.caloriesWithUnit")}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`${FORM_ID}-calories`}
                    aria-invalid={fieldState.invalid}
                    placeholder={t(
                      "nutrition:macronutrients.caloriesPlaceholder",
                    )}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Proteins Field */}
            <Controller
              name="proteins"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${FORM_ID}-proteins`}>
                    {t("nutrition:macronutrients.proteinsWithUnit")}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`${FORM_ID}-proteins`}
                    aria-invalid={fieldState.invalid}
                    placeholder={t(
                      "nutrition:macronutrients.proteinsPlaceholder",
                    )}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Fats Field */}
            <Controller
              name="fats"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${FORM_ID}-fats`}>
                    {t("nutrition:macronutrients.fatsWithUnit")}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`${FORM_ID}-fats`}
                    aria-invalid={fieldState.invalid}
                    placeholder={t("nutrition:macronutrients.fatsPlaceholder")}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Carbohydrates Field */}
            <Controller
              name="carbohydrates"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${FORM_ID}-carbohydrates`}>
                    {t("nutrition:macronutrients.carbsWithUnit")}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`${FORM_ID}-carbohydrates`}
                    aria-invalid={fieldState.invalid}
                    placeholder={t("nutrition:macronutrients.carbsPlaceholder")}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Water Intake Field */}
            <Controller
              name="water"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${FORM_ID}-water`}>
                    {t("nutrition:macronutrients.waterWithUnit")}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`${FORM_ID}-water`}
                    aria-invalid={fieldState.invalid}
                    placeholder={t("nutrition:macronutrients.waterPlaceholder")}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isUpdatingUserData || !form.formState.isDirty}
          >
            {t("common:actions.reset")}
          </Button>
          <Button
            type="submit"
            form={FORM_ID}
            disabled={isUpdatingUserData || !form.formState.isDirty}
          >
            {t("common:actions.save")}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
