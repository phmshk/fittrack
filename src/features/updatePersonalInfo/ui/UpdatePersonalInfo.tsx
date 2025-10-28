import { useGetUserData, useUpdateUserData, type UserInput } from "@/entities/user";
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

const FORM_ID = "personal-info-form";

interface UpdatePersonalInfoProps {
  isStandalone?: boolean;
}

export const UpdatePersonalInfo = (props: UpdatePersonalInfoProps) => {
  const { isStandalone = true } = props;
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
                <FieldLabel htmlFor={`${FORM_ID}-name`}>Name</FieldLabel>
                <Input
                  {...field}
                  id={`${FORM_ID}-name`}
                  aria-invalid={fieldState.invalid}
                  placeholder="Your name"
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
                <FieldLabel>Gender</FieldLabel>
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
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="male">
                      Male
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="female">
                      Female
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
              <FieldLabel htmlFor={`${FORM_ID}-weight`}>Weight (kg)</FieldLabel>
              <Input
                {...field}
                id={`${FORM_ID}-weight`}
                aria-invalid={fieldState.invalid}
                placeholder="Your weight"
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
              <FieldLabel htmlFor={`${FORM_ID}-height`}>Height (cm)</FieldLabel>
              <Input
                {...field}
                id={`${FORM_ID}-height`}
                aria-invalid={fieldState.invalid}
                placeholder="Your height"
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
              <FieldLabel htmlFor={`${FORM_ID}-age`}>Age (years)</FieldLabel>
              <Input
                {...field}
                id={`${FORM_ID}-age`}
                aria-invalid={fieldState.invalid}
                placeholder="Your age"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );

  if (isLoadingUserData) {
    return <Spinner text="Loading user data..." />;
  }

  if (!isStandalone) {
    return <>{FormContent}</>;
  }

  return (
    <Card className="h-full w-full border-none">
      <CardHeader>
        <CardTitle>Your personal information</CardTitle>
        <CardDescription>
          Provide accurate personal details to receive tailored fitness and
          nutrition recommendations.
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
            Reset
          </Button>
          <Button
            type="submit"
            form="personal-info-form"
            disabled={isUpdatingUserData || !form.formState.isDirty}
          >
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
