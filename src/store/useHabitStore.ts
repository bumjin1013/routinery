import {create} from "zustand";

interface Habit {
  id: string;
  name: string;
  createdAt: Date;
  checked: boolean;
}

interface HabitStore {
  habits: Habit[];
  addHabit: (name: string) => void;
  toggleHabit: (id: string) => void;
}

export const useHabitStore = create<HabitStore>((set) => ({
  habits: [],
  addHabit: (name: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      createdAt: new Date(),
      checked: false,
    };
    set((state) => ({
      habits: [...state.habits, newHabit],
    }));
  },
  toggleHabit: (id: string) => {
    set((state) => ({
      habits: state.habits.map((habit) => (habit.id === id ? {...habit, checked: !habit.checked} : habit)),
    }));
  },
}));
