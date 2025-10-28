import { Controller, useForm, useFormContext } from "react-hook-form";
import { goalFormSchema, type GoalFormValues } from "../model/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { goals, useGetUserData, useUpdateUserData } from "@/entities/user";
import { Spinner } from "@/shared/ui/spinner";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/shared/shadcn/components/ui/field";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/shared/shadcn/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { Button } from "@/shared/shadcn/components/ui/button";

const FORM_ID = "goals-form";

interface UpdateUserGoalProps {
  isStandalone?: boolean;
}

export const UpdateUserGoal = (props: UpdateUserGoalProps) => {
  const { isStandalone = true } = props;
  const { data: userData, isLoading: isLoadingUserData } = useGetUserData();
  const { mutate: updateUserData, isPending: isUpdatingUserData } =
    useUpdateUserData();

  const contextForm = useFormContext<GoalFormValues>();

  const standaloneForm = useForm<GoalFormValues>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      goal: userData?.goal || "maintain_weight",
    },
  });

  const form = isStandalone ? standaloneForm : contextForm;

  const onSubmit = (data: GoalFormValues) => {
    updateUserData({
      goal: data.goal,
    });
    form.reset(data);
  };

  const FormContent = (
    <form
      id={FORM_ID}
      onSubmit={isStandalone ? form.handleSubmit(onSubmit) : () => {}}
    >
      <FieldGroup>
        <Controller
          name="goal"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldSet data-invalid={fieldState.invalid}>
              <FieldLegend>Goals</FieldLegend>
              <FieldDescription>
                You can update your goal at any time.
                <br />
                <span className="font-bold">
                  Please notice that selecting any of these will calculate new
                  nutritional targets and replace your existing ones.
                </span>
              </FieldDescription>
              <RadioGroup
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                aria-invalid={fieldState.invalid}
              >
                {goals.map((goal) => (
                  <FieldLabel
                    key={goal.id}
                    htmlFor={`${FORM_ID}-${goal.id}`}
                    className="cursor-pointer"
                  >
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <FieldTitle>{goal.title}</FieldTitle>
                      </FieldContent>
                      <RadioGroupItem
                        value={goal.id}
                        id={`${FORM_ID}-${goal.id}`}
                        aria-invalid={fieldState.invalid}
                      />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldSet>
          )}
        />
      </FieldGroup>
    </form>
  );

  if (isLoadingUserData) {
    return <Spinner text="Loading goals..." />;
  }

  if (!isStandalone) {
    return <>{FormContent}</>;
  }

  return (
    <Card className="h-full w-full justify-between border-none">
      <CardHeader>
        <CardTitle>Your goal</CardTitle>
        <CardDescription>
          Select your primary fitness goal. This will adjust your calorie and
          macronutrient recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>{FormContent}</CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={
              isUpdatingUserData || form.getValues("goal") === userData?.goal
            }
          >
            Reset
          </Button>
          <Button
            type="submit"
            form={FORM_ID}
            disabled={
              isUpdatingUserData ||
              !form.formState.isDirty ||
              form.getValues("goal") === userData?.goal
            }
          >
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
