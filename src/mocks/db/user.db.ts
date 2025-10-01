import type { User, UserGoals } from "@/entities/user";
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
const users = new Map<string, StoredUser>();
const userGoals = new Map<string, UserGoals>();

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
  },
  userGoals: {
    targetCalories: 2500,
    targetProteins: 180,
    targetCarbs: 250,
    targetFats: 80,
  } as UserGoals,
};

// --- Function to seed initial data ---
const seed = (): void => {
  users.clear();
  userGoals.clear();
  const mockUser: StoredUser = { ...seedData.user };
  const mockUserGoals: UserGoals = { ...seedData.userGoals };

  users.set(mockUser.id, mockUser);
  userGoals.set(mockUser.id, mockUserGoals);
};

// Initial seeding
seed();

// --- Exported object with methods for managing the database ---
export const userDb = {
  // --- Auth Methods ---
  findUserByEmail: (
    email: string,
  ): (User & { password?: string }) | undefined =>
    Array.from(users.values()).find((user) => user.email === email),

  findUserById: (id: string): User | undefined => {
    const user = users.get(id);
    return user ? stripPassword(user) : undefined;
  },

  createUser: (data: ApiComponents["schemas"]["RegisterRequest"]): User => {
    const newUser: StoredUser = { id: crypto.randomUUID(), ...data };
    users.set(newUser.id, newUser);
    return stripPassword(newUser);
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

  // --- UserGoals Methods ---
  getGoals: (userId: string): UserGoals | undefined => userGoals.get(userId),
  updateGoals: (
    userId: string,
    newGoalsData: Partial<UserGoals>,
  ): UserGoals | null => {
    const currentGoals = userGoals.get(userId);
    if (currentGoals) {
      const updatedGoals = { ...currentGoals, ...newGoalsData };
      userGoals.set(userId, updatedGoals);
      return updatedGoals;
    }
    return null;
  },

  // --- Reset Method (useful for testing) ---
  reset: (): void => seed(),
};
