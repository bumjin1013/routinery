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
              return habit;
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

              if (isChecked) {
                // 체크 해제: 해당 날짜 제거
                return {
                  ...habit,
                  checkedDate: checkedDate.filter((date) => date !== selectedDateStr),
                };
              } else {
                // 체크: 날짜 추가 후 정렬 (최신순)
                const newCheckedDate = [...checkedDate, selectedDateStr].sort().reverse();
                return {
                  ...habit,
                  checkedDate: newCheckedDate,
                };
              }
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
      }),
    },
  ),
);
