export {
  useGetUserData,
  useUpdateUserData,
  userQueryOptions,
} from "./api/userApi";

export {
  useSessionStore,
  useCurrentUser,
  useIsAuthenticated,
  useAuthToken,
} from "./model/useSession";
export type {
  User,
  UserInput,
  UserSession,
  PersonalData,
  DailyTargets,
  WeightLog,
  WeightLogInput,
} from "./model/types";
export {
  goals,
  GOALS_IDS,
  activityLevels,
  ACTIVITY_LEVELS_IDS,
  type ActivityLevels,
  type GoalOptions,
} from "./model/types";
export {
  type WeightLogFormValues,
  getFormSchema,
} from "./model/zodWeightSchema";
export {
  getProfileSchema,
  type ProfileFormData,
} from "./model/zodAccountSchemas";
export {
  type CalculationResult,
  calculateDailyNeeds,
  type Gender,
} from "./lib/calc";

export { getFirebaseAuthErrorMessage } from "./lib/firebaseErrors";
