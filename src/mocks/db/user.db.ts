import type { User, UserGoals, UserSession } from "@/entities/user";
import type { ApiComponents } from "@/shared/api/schema";

// --- "Tables" for our in-memory database ---
const users = new Map<string, User>();
const sessions = new Map<
  string,
  Omit<UserSession, "user"> & { userId: string }
>(); // Store only token and userId
let userGoals: UserGoals | null = null;

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
  sessions.clear();

  const mockUser = { ...seedData.user };
  users.set(mockUser.id, {
    id: mockUser.id,
    name: mockUser.name,
    email: mockUser.email,
  });
  // Add password separately
  (users.get(mockUser.id) as User & { password?: string }).password =
    mockUser.password;

  userGoals = { ...seedData.userGoals };
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

  findUserById: (id: string): User | undefined => users.get(id),

  createUser: (data: ApiComponents["schemas"]["RegisterRequest"]): User => {
    const newUser = { id: crypto.randomUUID(), ...data };
    users.set(newUser.id, newUser);
    return newUser;
  },

  createSession: (userId: string): Omit<UserSession, "user"> => {
    const session = { token: `mock_token_${crypto.randomUUID()}` };
    sessions.set(session.token, { userId, ...session });
    return session;
  },

  findSessionByToken: (
    token: string,
  ): (Omit<UserSession, "user"> & { userId: string }) | undefined =>
    sessions.get(token),

  // --- UserGoals Methods ---
  getGoals: (): UserGoals | null => userGoals,
  updateGoals: (newGoalsData: Partial<UserGoals>): UserGoals | null => {
    if (userGoals) {
      userGoals = { ...userGoals, ...newGoalsData };
    }
    return userGoals;
  },

  // --- Reset Method (useful for testing) ---
  reset: (): void => seed(),
};
