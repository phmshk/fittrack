import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema, type UserProfileFormValues } from "../model/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/shadcn/components/ui/form";
import { PersonalInfo } from "./Step1_PersonalInfo";
import { ActivityLevel } from "./Step2_ActivityLevel";
import { Goals } from "./Step3_Goals";
import { ResultsDisplay } from "./Step4_ResultsDisplay";
import { CalculationAnimation } from "@/shared/ui/calcAnimation";
import { Button } from "@/shared/shadcn/components/ui/button";
import { useUpdateUserData } from "@/entities/user";

const TOTAL_STEPS = 4;

export const UserProfileForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { mutate: updateUserData, isPending: isUpdatingGoals } =
    useUpdateUserData();
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: undefined,
      age: "",
      height: "",
      weight: "",
      activityLevel: undefined,
      goal: undefined,
      targetCalories: "",
      targetProteins: "",
      targetCarbs: "",
      targetFats: "",
      targetWaterIntake: "",
    },
  });

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await form.trigger(["age", "gender", "height", "weight"]);
    } else if (currentStep === 2) {
      isValid = await form.trigger(["activityLevel"]);
    } else if (currentStep === 3) {
      isValid = await form.trigger(["goal"]);
      if (isValid) {
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
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: UserProfileFormValues) => {
    updateUserData(
      {
        hasCompletedSetup: true,
        dailyTargets: {
          targetCalories: Number(data.targetCalories),
          targetProteins: Number(data.targetProteins),
          targetCarbs: Number(data.targetCarbs),
          targetFats: Number(data.targetFats),
          targetWaterIntake: Number(data.targetWaterIntake),
        },
      },
      {
        onSuccess: () => {
          navigate({ to: "/", replace: true });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {isCalculating ? (
          <CalculationAnimation />
        ) : (
          <>
            {currentStep === 1 && <PersonalInfo />}
            {currentStep === 2 && <ActivityLevel />}
            {currentStep === 3 && <Goals />}
            {currentStep === 4 && (
              <ResultsDisplay onRecalculate={() => setCurrentStep(1)} />
            )}
          </>
        )}
        {!isCalculating && (
          <div className="flex justify-between pt-4">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            <div className="flex-grow"></div>
            {currentStep < TOTAL_STEPS && (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            )}
            {currentStep === TOTAL_STEPS && (
              <Button type="submit" disabled={isUpdatingGoals}>
                {isUpdatingGoals ? "Saving..." : "Save and Finish"}
              </Button>
            )}
          </div>
        )}
      </form>
    </Form>
  );
};
