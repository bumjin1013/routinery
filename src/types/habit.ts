type HabitFrequency = "daily" | "weekly" | "monthly";

type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type DayOfMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;

type HabitSchedule = DayOfWeek[] | DayOfMonth[];

type Habit = {
  id: string;
  title: string;
  frequency: HabitFrequency;
  schedule?: HabitSchedule;
  createdAt: Date;
  checkedDate: string[];
};

export type {Habit, HabitFrequency, HabitSchedule, DayOfWeek, DayOfMonth};
