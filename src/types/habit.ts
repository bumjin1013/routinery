type HabitFrequency = "daily" | "weekly" | "monthly";

type DayOfWeek = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

type DayOfMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;

// 빈도별 체크 가능한 날짜 설정
type HabitSchedule =
  | {type: "daily"} // 매일 체크 가능
  | {type: "weekly"; days: DayOfWeek[]} // 선택한 요일에만 체크 가능
  | {type: "monthly"; days: DayOfMonth[]}; // 선택한 일자에만 체크 가능

type Habit = {
  id: string;
  title: string;
  frequency: HabitFrequency;
  schedule: HabitSchedule;
};

export type {Habit, HabitFrequency, HabitSchedule, DayOfWeek, DayOfMonth};
