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
import { useTranslation } from "react-i18next";

const FORM_ID = "activity-level-form";

interface UpdateActivityLevelProps {
  isStandalone?: boolean;
}

export const UpdateActivityLevel = (props: UpdateActivityLevelProps) => {
  const { isStandalone = true } = props;
  const { t } = useTranslation(["forms", "common"]);
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
              <FieldLegend>{t("forms:activityLevel.title")}</FieldLegend>
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
                        <FieldTitle>
                          {t(`forms:activityLevel.options.${level.id}.title`)}
                        </FieldTitle>
                        <FieldDescription>
                          {t(
                            `forms:activityLevel.options.${level.id}.description`,
                          )}
                        </FieldDescription>
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
    return <Spinner text={t("common:loading")} />;
  }

  if (!isStandalone) {
    return <>{FormContent}</>;
  }

  return (
    <Card className="h-full w-full border-none">
      <CardHeader>
        <CardTitle>{t("forms:activityLevel.yourActivityLevel")}</CardTitle>
        <CardDescription>
          {t("forms:activityLevel.description")}
          <br />
          <span className="font-bold">{t("forms:activityLevel.warning")}</span>
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
            {t("common:actions.reset")}
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
            {t("common:actions.save")}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
