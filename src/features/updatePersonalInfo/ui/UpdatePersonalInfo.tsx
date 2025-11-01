import {
  useGetUserData,
  useUpdateUserData,
  type UserInput,
} from "@/entities/user";
import { Controller, useForm, useFormContext } from "react-hook-form";
import {
  personalInfoSchema,
  type PersonalInfoFormValues,
} from "../model/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/shared/ui/spinner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/shadcn/components/ui/field";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn/components/ui/select";
import { Input } from "@/shared/shadcn/components/ui/input";
import { useTranslation } from "react-i18next";

const FORM_ID = "personal-info-form";

interface UpdatePersonalInfoProps {
  isStandalone?: boolean;
}

export const UpdatePersonalInfo = (props: UpdatePersonalInfoProps) => {
  const { isStandalone = true } = props;
  const { t } = useTranslation(["profile", "common", "forms"]);
  const { data: userData, isLoading: isLoadingUserData } = useGetUserData();
  const { mutate: updateUserData, isPending: isUpdatingUserData } =
    useUpdateUserData();

  const contextForm = useFormContext<PersonalInfoFormValues>();

  const standaloneForm = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: userData?.name || "",
      gender: userData?.personalData?.gender || "",
      age: String(userData?.personalData?.age) || "",
      height: String(userData?.personalData?.height) || "",
      weight: String(userData?.personalData?.weight) || "",
    },
  });

  const form = isStandalone ? standaloneForm : contextForm;

  const onSubmit = (data: PersonalInfoFormValues) => {
    const dirtyFields = form.formState.dirtyFields;
    if (Object.keys(dirtyFields).length === 0) {
      return;
    }
    // Collect changes, so that unchanged fields won't be sent to the API
    const changes: Partial<UserInput> = {};
    const personalDataChanges: Partial<UserInput["personalData"]> = {};
    let hasPersonalDataChanges = false;

    if (dirtyFields.name && data.name !== userData?.name) {
      changes.name = data.name;
    }

    if (dirtyFields.age && Number(data.age) !== userData?.personalData?.age) {
      personalDataChanges.age = Number(data.age);
      hasPersonalDataChanges = true;
    }

    if (
      dirtyFields.height &&
      Number(data.height) !== userData?.personalData?.height
    ) {
      personalDataChanges.height = Number(data.height);
      hasPersonalDataChanges = true;
    }

    if (
      dirtyFields.weight &&
      Number(data.weight) !== userData?.personalData?.weight
    ) {
      personalDataChanges.weight = Number(data.weight);
      hasPersonalDataChanges = true;
    }

    if (hasPersonalDataChanges) {
      changes.personalData = personalDataChanges;
    }

    if (Object.keys(changes).length > 0) {
      updateUserData(changes);
      form.reset(data);
    }
  };

  const FormContent = (
    <form
      id={FORM_ID}
      onSubmit={isStandalone ? form.handleSubmit(onSubmit) : () => {}}
    >
      <FieldGroup>
        {/* Name Field only on standalone form */}
        {isStandalone && (
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${FORM_ID}-name`}>
                  {t("forms:personalInfo.nameLabel")}
                </FieldLabel>
                <Input
                  {...field}
                  id={`${FORM_ID}-name`}
                  aria-invalid={fieldState.invalid}
                  placeholder={t("forms:personalInfo.namePlaceholder")}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}
        {/* Gender Field only shows if not set */}
        {!userData?.personalData?.gender && (
          <Controller
            name="gender"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>{t("forms:personalInfo.genderLabel")}</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!!userData?.personalData?.gender}
                >
                  <SelectTrigger
                    id={`${FORM_ID}-gender`}
                    aria-invalid={fieldState.invalid}
                    className="cursor-pointer"
                  >
                    <SelectValue
                      placeholder={t("forms:personalInfo.genderPlaceholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="male">
                      {t("forms:personalInfo.genderOptions.male")}
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="female">
                      {t("forms:personalInfo.genderOptions.female")}
                    </SelectItem>
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

        {/* Weight Field */}
        <Controller
          name="weight"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${FORM_ID}-weight`}>
                {t("forms:personalInfo.weightLabel")}
              </FieldLabel>
              <Input
                {...field}
                id={`${FORM_ID}-weight`}
                aria-invalid={fieldState.invalid}
                placeholder={t("forms:personalInfo.weightPlaceholder")}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Height Field */}
        <Controller
          name="height"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${FORM_ID}-height`}>
                {t("forms:personalInfo.heightLabel")}
              </FieldLabel>
              <Input
                {...field}
                id={`${FORM_ID}-height`}
                aria-invalid={fieldState.invalid}
                placeholder={t("forms:personalInfo.heightPlaceholder")}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Age Field */}
        <Controller
          name="age"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${FORM_ID}-age`}>
                {t("forms:personalInfo.ageLabel")}
              </FieldLabel>
              <Input
                {...field}
                id={`${FORM_ID}-age`}
                aria-invalid={fieldState.invalid}
                placeholder={t("forms:personalInfo.agePlaceholder")}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
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
        <CardTitle>{t("forms:personalInfo.title")}</CardTitle>
        <CardDescription>
          {t("forms:personalInfo.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>{FormContent}</CardContent>
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
