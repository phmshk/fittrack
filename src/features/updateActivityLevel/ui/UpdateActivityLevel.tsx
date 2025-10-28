import {
  activityLevels,
  useGetUserData,
  useUpdateUserData,
} from "@/entities/user";
import { Spinner } from "@/shared/ui/spinner";
import { Controller, useForm, useFormContext } from "react-hook-form";
import {
  activityFormSchema,
  type ActivityFormValues,
} from "../model/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
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

const FORM_ID = "activity-level-form";

interface UpdateActivityLevelProps {
  isStandalone?: boolean;
}

export const UpdateActivityLevel = (props: UpdateActivityLevelProps) => {
  const { isStandalone = true } = props;
  const { data: userData, isLoading: isLoadingUserData } = useGetUserData();
  const { mutate: updateUserData, isPending: isUpdatingUserData } =
    useUpdateUserData();

  const contextForm = useFormContext<ActivityFormValues>();
  const standaloneForm = useForm<ActivityFormValues>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      activityLevel: userData?.activityLevel || undefined,
    },
  });

  const form = isStandalone ? standaloneForm : contextForm;

  const onSubmit = (data: ActivityFormValues) => {
    updateUserData({
      activityLevel: data.activityLevel,
    });
    form.reset(data);
  };

  const FormContent = (
    <form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="activityLevel"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldSet data-invalid={fieldState.invalid}>
              <FieldLabel>Activity Level</FieldLabel>
              <FieldDescription>
                You can update your activity level at any time.
              </FieldDescription>
              <RadioGroup
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                aria-invalid={fieldState.invalid}
              >
                {activityLevels.map((level) => (
                  <FieldLabel
                    key={level.id}
                    htmlFor={`${FORM_ID}-${level.id}`}
                    className="cursor-pointer"
                  >
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <FieldTitle>{level.title}</FieldTitle>
                        <FieldDescription>{level.description}</FieldDescription>
                      </FieldContent>
                      <RadioGroupItem
                        value={level.id}
                        id={`${FORM_ID}-${level.id}`}
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
    <Card className="h-full w-full border-none">
      <CardHeader>
        <CardTitle>Your activity level</CardTitle>
        <CardDescription>
          Select your activity level. This will adjust your calorie and
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
              isUpdatingUserData ||
              form.getValues("activityLevel") === userData?.activityLevel
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
              form.getValues("activityLevel") === userData?.activityLevel
            }
          >
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
