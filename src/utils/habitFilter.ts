import dayjs from "dayjs";
import {Habit, DayOfWeek, DayOfMonth} from "@/types/habit";

// 선택된 날짜에 스케줄된 습관들을 필터링
export const getScheduledHabits = (habits: Habit[], selectedDate: string): Habit[] => {
  const currentDate = dayjs(selectedDate);
  const currentDayOfWeek = currentDate.day();
  const currentDayOfMonth = currentDate.date();

  return habits.filter((habit) => {
    switch (habit.frequency) {
      case "daily":
        return true;
      case "weekly":
        return (habit.schedule as DayOfWeek[]).includes(currentDayOfWeek as DayOfWeek);
      case "monthly":
        return (habit.schedule as DayOfMonth[]).includes(currentDayOfMonth as DayOfMonth);
      default:
        return false;
    }
  });
};

// 특정 날짜에 습관이 체크되었는지
export const isHabitCheckedOnDate = (habit: Habit, date: string): boolean => {
  return habit.checkedDate?.includes(date) || false;
};

// 선택된 날짜에 체크된 습관 개수
export const getSelectedDateCheckedHabitsCount = (habits: Habit[], selectedDate: string): number => {
  return habits.filter((habit) => isHabitCheckedOnDate(habit, selectedDate)).length;
};
