import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import {Dayjs} from "dayjs";
import dayjs from "dayjs";
import {Habit} from "@/types/habit";
import {MMKV} from "react-native-mmkv";

const storage = new MMKV();

const mmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ? Promise.resolve(value) : Promise.resolve(null);
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
    return Promise.resolve(true);
  },
  removeItem: (name: string) => {
    storage.delete(name);
    return Promise.resolve();
  },
};

interface HabitStore {
  habits: Habit[];
  selectedDate: string;
  addHabit: (habit: Habit) => void;
  editHabit: (habit: Habit) => void;
  checkHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
  setSelectedDate: (date: Dayjs) => void;
}

export const useHabitStore = create<HabitStore>()(
  persist(
    (set) => ({
      habits: [],
      selectedDate: dayjs().format("YYYY-MM-DD"),
      addHabit: (habit: Habit) => {
        set((state) => ({
          habits: [...state.habits, habit],
        }));
      },
      editHabit: (habit: Habit) => {
        set((state) => ({
          habits: state.habits.map((h) => {
            if (h.id === habit.id) {
              return {
                ...habit,
                checkedDate: habit.checkedDate,
              };
            }
            return h;
          }),
        }));
      },
      checkHabit: (id: string) => {
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id === id) {
              const selectedDateStr = state.selectedDate;
              const checkedDate = habit.checkedDate;
              const isChecked = checkedDate.includes(selectedDateStr);

              return {
                ...habit,
                checkedDate: isChecked ? checkedDate.filter((date) => date !== selectedDateStr) : [...checkedDate, selectedDateStr],
              };
            }
            return habit;
          }),
        }));
      },
      setSelectedDate: (date: Dayjs) => {
        set({selectedDate: date.format("YYYY-MM-DD")});
      },
      deleteHabit: (id: string) => {
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        }));
      },
    }),
    {
      name: "habit-storage",
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        habits: state.habits,
        selectedDate: state.selectedDate,
      }),
    },
  ),
);
