import { create } from "zustand";

interface DateStore {
  selectedDate: Date;
  today: Date;
  setSelectedDate: (date: Date) => void;
}

export const useDateStore = create<DateStore>()((set) => ({
  selectedDate: new Date(),
  today: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
