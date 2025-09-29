import { create } from "zustand";

interface DayEditState {
  isEditing: boolean;
  startEditing: () => void;
  stopEditing: () => void;
}

export const useDayEditStore = create<DayEditState>()((set) => ({
  isEditing: false,
  startEditing: () => set({ isEditing: true }),
  stopEditing: () => set({ isEditing: false }),
}));
