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

const FORM_ID = "update-macros-and-calories-form";

export const UpdateMarcosAndCalories = () => {
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
    return <Spinner text="Loading user data..." />;
  }

  return (
    <Card className="h-full w-full border-none">
      <CardHeader>
        <CardTitle>Nutritional Goals</CardTitle>
        <CardDescription>
          You can set your daily nutritional targets here if you don't like the
          suggested ones.
          <br />
          <span className="font-bold">
            Please notice that changing any of these will override the
            automatically calculated targets. If you'd like to revert to the
            suggested targets, you can do so any time by selecting your goal and
            activity level again.
          </span>
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
                    Calories (kcal)
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`${FORM_ID}-calories`}
                    aria-invalid={fieldState.invalid}
                    placeholder="Your daily calories goal"
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
                    Proteins (g)
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`${FORM_ID}-proteins`}
                    aria-invalid={fieldState.invalid}
                    placeholder="Your daily proteins goal"
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
                  <FieldLabel htmlFor={`${FORM_ID}-fats`}>Fats (g)</FieldLabel>
                  <Input
                    {...field}
                    id={`${FORM_ID}-fats`}
                    aria-invalid={fieldState.invalid}
                    placeholder="Your daily fats goal"
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
                    Carbohydrates (g)
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`${FORM_ID}-carbohydrates`}
                    aria-invalid={fieldState.invalid}
                    placeholder="Your daily carbohydrates goal"
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
                    Water Intake (ml)
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`${FORM_ID}-water`}
                    aria-invalid={fieldState.invalid}
                    placeholder="Your daily water intake goal"
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
            Reset
          </Button>
          <Button
            type="submit"
            form={FORM_ID}
            disabled={isUpdatingUserData || !form.formState.isDirty}
          >
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
