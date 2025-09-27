import { create } from "zustand";

interface DayEditState {
  isEditing: boolean;
  editingDate: Date | null;
  startEditing: (date: Date) => void;
  stopEditing: () => void;
}

export const useDayEditStore = create<DayEditState>()((set) => ({
  isEditing: false,
  editingDate: null,
  startEditing: (date) => set({ isEditing: true, editingDate: date }),
  stopEditing: () => set({ isEditing: false, editingDate: null }),
}));
