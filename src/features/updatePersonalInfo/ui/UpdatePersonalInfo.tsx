import { useGetUserData, useUpdateUserData } from "@/entities/user";
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
    updateUserData({
      name: data.name,
      personalData: {
        gender: data.gender === "" ? undefined : data.gender,
        age: Number(data.age),
        height: Number(data.height),
        weight: Number(data.weight),
      },
    });
    form.reset(data);
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
                  >
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
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
              <FieldLabel htmlFor={`${FORM_ID}-weight`}>Weight</FieldLabel>
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
              <FieldLabel htmlFor={`${FORM_ID}-height`}>Height</FieldLabel>
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
              <FieldLabel htmlFor={`${FORM_ID}-age`}>Age</FieldLabel>
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
