import { formatDateForApi } from "@/shared/lib/utils";
import type { User, UserInput, WeightLogInput } from "../model/types";
import { calculateDailyNeeds } from "./calc";

interface PreparePayloadParams {
  currentUserData: User;
  updatedData: Partial<UserInput>;
}

export const prepareUpdatePayload = ({
  currentUserData,
  updatedData,
}: PreparePayloadParams): {
  payload: Partial<UserInput>;
  newWeightLog?: WeightLogInput;
} => {
  if (!currentUserData) {
    return { payload: updatedData };
  }

  // Merge current user data with updates
  const mergedData = {
    ...currentUserData,
    ...updatedData,
    personalData: {
      ...currentUserData.personalData,
      ...updatedData.personalData,
    },
    dailyTargets: updatedData.dailyTargets
      ? { ...currentUserData.dailyTargets, ...updatedData.dailyTargets }
      : currentUserData.dailyTargets,
  };

  let recalculatedTargets = mergedData.dailyTargets;

  //Check if any relevant for calculation fields have changed
  const relevantFieldsHaveChanged =
    updatedData.personalData?.age ||
    updatedData.personalData?.weight ||
    updatedData.personalData?.height ||
    updatedData.activityLevel ||
    updatedData.goal;

  console.log("Relevant fields changed:", relevantFieldsHaveChanged);

  if (relevantFieldsHaveChanged) {
    const updatedNeeds = calculateDailyNeeds({
      age: mergedData.personalData.age!,
      weight: mergedData.personalData.weight!,
      height: mergedData.personalData.height!,
      activityLevel: mergedData.activityLevel,
      goal: mergedData.goal,
      gender: mergedData.personalData.gender!,
    });
    recalculatedTargets = {
      targetCalories: updatedNeeds.caloriesForGoal,
      targetCarbs: updatedNeeds.macronutrients.carbs,
      targetProteins: updatedNeeds.macronutrients.proteins,
      targetFats: updatedNeeds.macronutrients.fats,
      targetWaterIntake: updatedNeeds.waterIntake.totalIntakeMl,
    };
  }
  const payload: Partial<UserInput> = {
    ...updatedData,
    personalData: updatedData.personalData,
    activityLevel: updatedData.activityLevel,
    goal: updatedData.goal,
    dailyTargets: recalculatedTargets,
  };

  // If weight has changed, prepare a new weight log entry
  let newWeightLog: WeightLogInput | undefined = undefined;
  const newWeight = updatedData.personalData?.weight;
  const mostRecentWeightLog =
    currentUserData.weightHistory?.[currentUserData.weightHistory.length - 1];

  console.log(
    "Preparing weight log. New weight:",
    newWeight,
    "Most recent log:",
    mostRecentWeightLog,
  );

  if (newWeight !== undefined) {
    const today = formatDateForApi(new Date());
    if (
      !mostRecentWeightLog ||
      mostRecentWeightLog.weight !== newWeight ||
      mostRecentWeightLog?.date !== today
    ) {
      newWeightLog = { weight: newWeight, date: today };
    }
  }

  //Clean up undefined fields in payload
  Object.keys(payload).forEach((key) => {
    if (payload[key as keyof UserInput] === undefined) {
      delete payload[key as keyof UserInput];
    }
    // don't send weightHistory in the payload beacause it's managed separately
    if (key === "weightHistory") {
      delete payload.weightHistory;
    }
  });
  return { payload, newWeightLog };
};
