import type {
  DailyTargets,
  PersonalData,
  User,
  WeightLog,
  WeightLogInput,
} from "@/entities/user";
import type { ApiComponents } from "@/shared/api/schema";
import { jwtVerify, SignJWT } from "jose";

type StoredUser = User & { password?: string };

// --- JWT Configuration ---
const JWT_SECRET = new TextEncoder().encode("secret-key-for-jwt-signing");
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";
const ALGORITHM = "HS256";

// Function to generate access and refresh tokens
const generateTokens = async (userId: string) => {
  const accessToken = await new SignJWT({ role: "user" })
    .setProtectedHeader({ alg: ALGORITHM })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET);

  const refreshToken = await new SignJWT({})
    .setProtectedHeader({ alg: ALGORITHM })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(JWT_SECRET);

  return { accessToken, refreshToken };
};

// --- "Tables" for our in-memory database ---
const users = new Map<
  string,
  Omit<StoredUser, "dailyTargets" | "personalData">
>();
const userPersonalData = new Map<string, PersonalData>();
const userDailyTargets = new Map<string, DailyTargets>();
const userWeightHistory = new Map<string, WeightLog[]>();

// --- Helper function to strip password for client-side responses ---
const stripPassword = (user: StoredUser): User => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// --- Initial data for development ---
const seedData = {
  user: {
    id: "a1b2-c3d4-e5f6-g7h8",
    email: "test@example.com",
    name: "Alex Doe",
    password: "password123",
    hasCompletedSetup: true,
  },
  personalData: {
    age: 30,
    height: 180,
    weight: 75,
    gender: "male",
  } as PersonalData,
  dailyTargets: {
    targetCalories: 2000,
    targetProteins: 180,
    targetCarbs: 250,
    targetFats: 80,
    targetWaterIntake: 2500,
  } as DailyTargets,
  weightHistory: [
    { id: "w1", date: "2025-09-01", weight: 75.0 },
    { id: "w2", date: "2025-09-08", weight: 74.5 },
    { id: "w3", date: "2025-09-15", weight: 74.2 },
    { id: "w4", date: "2025-09-22", weight: 74.0 },
    { id: "w5", date: "2025-09-29", weight: 73.5 },
  ] as WeightLog[],
};

// --- Function to seed initial data ---
const seed = (): void => {
  users.clear();
  userPersonalData.clear();
  userDailyTargets.clear();
  const mockUser: StoredUser = {
    ...seedData.user,
    activityLevel: "moderate",
    goal: "maintain_weight",
  };
  const mockUserPersonalData: PersonalData = { ...seedData.personalData };
  const mockUserDailyTargets: DailyTargets = { ...seedData.dailyTargets };
  const mockWeightHistory: WeightLog[] = [...seedData.weightHistory];

  users.set(mockUser.id, mockUser);
  userPersonalData.set(mockUser.id, mockUserPersonalData);
  userDailyTargets.set(mockUser.id, mockUserDailyTargets);
  userWeightHistory.set(mockUser.id, mockWeightHistory);
};

// Initial seeding
seed();

// --- Exported object with methods for managing the database ---
export const userDb = {
  // --- Auth Methods ---
  // This function is for internal use by auth handlers. It returns the user WITH the password.
  _findUserByEmailWithPassword: (email: string): StoredUser | undefined => {
    const userBase = Array.from(users.values()).find(
      (user) => user.email === email,
    );
    if (!userBase) return undefined;

    return {
      ...userBase,
      personalData: userPersonalData.get(userBase.id),
      dailyTargets: userDailyTargets.get(userBase.id),
      weightHistory: userWeightHistory.get(userBase.id),
    };
  },

  // This function is safe to use elsewhere as it strips the password.
  findUserByEmail: (email: string): User | undefined => {
    const user = userDb._findUserByEmailWithPassword(email);
    if (!user) return undefined;
    return stripPassword(user);
  },

  findUserById: (id: string): StoredUser | undefined => {
    const userBase = users.get(id);
    if (!userBase) return undefined;

    return {
      ...userBase,
      personalData: userPersonalData.get(id),
      dailyTargets: userDailyTargets.get(id),
      weightHistory: userWeightHistory.get(id),
    };
  },
  createUser: (data: ApiComponents["schemas"]["RegisterRequest"]): User => {
    const newUser: Omit<
      StoredUser,
      "dailyTargets" | "personalData" | "weightHistory"
    > = {
      id: crypto.randomUUID(),
      ...data,
      hasCompletedSetup: false,
    };
    users.set(newUser.id, newUser);

    // Create default empty entries for personal data and goals
    userPersonalData.set(newUser.id, {});
    userDailyTargets.set(newUser.id, {});
    userWeightHistory.set(newUser.id, []);

    const fullUser = userDb.findUserById(newUser.id);
    return stripPassword(fullUser!);
  },

  updateUser: (userId: string, updates: Partial<User>): User | null => {
    const user = users.get(userId);
    if (user) {
      const { personalData, ...otherUpdates } = updates;
      const updatedUser = { ...user, ...otherUpdates };
      users.set(userId, updatedUser);

      if (personalData) {
        const currentPersonalData = userPersonalData.get(userId) || {};
        userPersonalData.set(userId, {
          ...currentPersonalData,
          ...personalData,
        });
      }
    }
    return userDb.findUserById(userId) || null;
  },

  updateGoals: (
    userId: string,
    updates: Partial<User>,
  ): DailyTargets | null => {
    const { dailyTargets: newGoalsData } = updates;
    const currentGoals = userDailyTargets.get(userId);
    if (currentGoals) {
      const updatedGoals = { ...currentGoals, ...newGoalsData };
      userDailyTargets.set(userId, updatedGoals);
      return updatedGoals;
    }
    return null;
  },

  // --- Weight Log Methods ---
  addWeightLog: (userId: string, newLog: WeightLogInput) => {
    const history = userWeightHistory.get(userId) || [];
    const newEntry: WeightLog = { ...newLog, id: crypto.randomUUID() };
    history.push(newEntry);
    userWeightHistory.set(userId, history);
    return userDb.findUserById(userId);
  },

  updateWeightLog: (userId: string, logId: string, updates: WeightLogInput) => {
    const history = userWeightHistory.get(userId) || [];
    const logIndex = history.findIndex((log) => log.id === logId);
    if (logIndex > -1) {
      history[logIndex] = { ...history[logIndex], ...updates };
      userWeightHistory.set(userId, history);
      return userDb.findUserById(userId);
    }
    return null;
  },

  deleteWeightLog: (userId: string, logId: string) => {
    const history = userWeightHistory.get(userId) || [];
    const newHistory = history.filter((log) => log.id !== logId);
    if (newHistory.length < history.length) {
      userWeightHistory.set(userId, newHistory);
      return true;
    }
    return false;
  },

  createSession: async (userId: string) => await generateTokens(userId),
  verifyToken: async (token: string) => {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      return { valid: true, payload };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return { valid: false, payload: null };
    }
  },

  // --- Reset Method (useful for testing) ---
  reset: (): void => seed(),
};
