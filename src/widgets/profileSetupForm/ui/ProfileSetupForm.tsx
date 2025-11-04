import {
  calculateDailyNeeds,
  useUpdateUserData,
  type CalculationResult,
} from "@/entities/user";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import {
  formSchema,
  type UserProfileFormValuesInput,
  type UserProfileFormValuesOutput,
} from "../model/zodSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePersonalInfo } from "@/features/updatePersonalInfo";
import { UpdateActivityLevel } from "@/features/updateActivityLevel";
import { UpdateUserGoal } from "@/features/updateUserGoal";
import { CalculationAnimation } from "@/shared/ui/calcAnimation";
import { Recommendations } from "@/shared/ui/recommendations";
import { Button } from "@/shared/shadcn/components/ui/button";
import { useTranslation } from "react-i18next";

const TOTAL_STEPS = 4;

export const ProfileSetupForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { mutate: updateUserData, isPending: isUpdatingUserData } =
    useUpdateUserData();
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedNeeds, setCalculatedNeeds] =
    useState<CalculationResult | null>(null);

  const { t } = useTranslation(["profileSetup", "common"]);

  const form = useForm<UserProfileFormValuesInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "",
      age: "",
      height: "",
      weight: "",
      activityLevel: "",
      goal: "",
    },
    mode: "onChange",
  });

  const nextStep = useCallback(async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await form.trigger(["age", "gender", "height", "weight"]);
    } else if (currentStep === 2) {
      isValid = await form.trigger(["activityLevel"]);
    } else if (currentStep === 3) {
      const parsedResult = await formSchema.safeParseAsync(form.getValues());
      if (parsedResult.success) {
        const needs = calculateDailyNeeds({
          gender: parsedResult.data.gender,
          age: Number(parsedResult.data.age),
          height: Number(parsedResult.data.height),
          weight: Number(parsedResult.data.weight),
          activityLevel: parsedResult.data.activityLevel,
          goal: parsedResult.data.goal,
        });
        setCalculatedNeeds(needs);
        setIsCalculating(true);
        setTimeout(() => {
          setIsCalculating(false);
          setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
        }, 3000); // Simulate a 3-second calculation delay
        return;
      }
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }
  }, [currentStep, form]);

  const prevStep = () => {
    setIsCalculating(false);
    setCalculatedNeeds(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: UserProfileFormValuesInput) => {
    const processedData: UserProfileFormValuesOutput = formSchema.parse(data);

    updateUserData(
      {
        personalData: {
          gender: processedData.gender,
          age: Number(processedData.age),
          height: Number(processedData.height),
          weight: Number(processedData.weight),
        },
        activityLevel: processedData.activityLevel,
        goal: processedData.goal,
        dailyTargets: {
          targetCalories: calculatedNeeds?.caloriesForGoal,
          targetProteins: calculatedNeeds?.macronutrients.proteins,
          targetCarbs: calculatedNeeds?.macronutrients.carbs,
          targetFats: calculatedNeeds?.macronutrients.fats,
          targetWaterIntake: calculatedNeeds?.waterIntake.totalIntakeMl,
        },
        hasCompletedSetup: true,
      },
      {
        onSuccess: () => {
          navigate({ to: "/", replace: true });
        },
      },
    );
  };

  return (
    <FormProvider {...form}>
      {isCalculating ? (
        <CalculationAnimation />
      ) : (
        <>
          {currentStep === 1 && <UpdatePersonalInfo isStandalone={false} />}
          {currentStep === 2 && <UpdateActivityLevel isStandalone={false} />}
          {currentStep === 3 && <UpdateUserGoal isStandalone={false} />}
          {currentStep === 4 && (
            <div className="animate-in fade-in-20 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">
                  {t("profileSetup:dailyTargets")}
                </h2>
                <p className="text-muted-foreground">
                  {t("profileSetup:recommendations")}
                </p>
              </div>
              <Recommendations dailyNeeds={calculatedNeeds!} />
              <div className="text-center">
                <Button variant="link" onClick={() => setCurrentStep(1)}>
                  {t("profileSetup:wantToAdjust")}
                  <br />
                  {t("common:actions.goBack")}
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {!isCalculating && (
        <div className="flex justify-between pt-4">
          {currentStep > 1 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              {t("common:actions.back")}
            </Button>
          )}
          <div className="flex-grow"></div>
          {currentStep < TOTAL_STEPS && (
            <Button type="button" onClick={nextStep}>
              {t("common:actions.next")}
            </Button>
          )}
          {currentStep === TOTAL_STEPS && (
            <Button
              type="submit"
              disabled={isUpdatingUserData}
              onClick={form.handleSubmit(onSubmit)}
            >
              {isUpdatingUserData
                ? t("common:actions.saving")
                : t("common:actions.finish")}
            </Button>
          )}
        </div>
      )}
    </FormProvider>
  );
};
