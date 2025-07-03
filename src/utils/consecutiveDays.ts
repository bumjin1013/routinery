import dayjs from "dayjs";
import {DayOfWeek, Habit} from "@/types/habit";

// 일일 습관의 연속일 계산
const calcDaily = (dates: string[]): number => {
  // 체크된 날짜가 없으면 0
  if (dates.length === 0) return 0;

  const dateSet = new Set(dates);
  const today = dayjs().startOf("day").format("YYYY-MM-DD");

  // 오늘이 체크된 날짜에 없으면 0
  if (!dateSet.has(today)) return 0;

  let count = 1;
  let current = dayjs(today);

  while (true) {
    const prev = current.subtract(1, "day").format("YYYY-MM-DD");

    if (dateSet.has(prev)) {
      count++;
      current = dayjs(prev);
    } else {
      break;
    }
  }

  return count;
};

// 주간 습관의 연속일 계산
const calcWeekly = (habit: Habit): number => {
  if (!habit.schedule || !Array.isArray(habit.schedule) || habit.checkedDate.length === 0) {
    return 0;
  }

  const scheduleDays = habit.schedule as DayOfWeek[];
  const checkedDateSet = new Set(habit.checkedDate);
  const today = dayjs().startOf("day");
  const todayStr = today.format("YYYY-MM-DD");
  const todayDayOfWeek = today.day();

  // 오늘이 스케줄에 없거나 체크하지 않았으면 0
  if (!scheduleDays.includes(todayDayOfWeek) || !checkedDateSet.has(todayStr)) {
    return 0;
  }

  // 스케줄에 해당하는 체크된 날짜들만 필터링
  const scheduledCheckedDates = habit.checkedDate.filter((date) => {
    const checkDate = dayjs(date);
    return scheduleDays.includes(checkDate.day());
  });

  if (scheduledCheckedDates.length === 0) return 0;

  let consecutiveDays = 1;
  let currentDate = today;

  // 이전 스케줄 날짜들 확인
  for (let i = 1; i < scheduledCheckedDates.length; i++) {
    const previousDate = dayjs(scheduledCheckedDates[i]);
    const daysDiff = currentDate.diff(previousDate, "day");

    // 스케줄 간격 계산
    const maxGap = calcMaxWeeklyGap(scheduleDays);

    if (daysDiff <= maxGap) {
      consecutiveDays++;
      currentDate = previousDate;
    } else {
      break;
    }
  }

  return consecutiveDays;
};

// 월간 습관의 연속일 계산
const calcMonthly = (habit: Habit): number => {
  if (!habit.schedule || !Array.isArray(habit.schedule) || habit.checkedDate.length === 0) {
    return 0;
  }

  const scheduleDays = habit.schedule as number[];
  const checkedDateSet = new Set(habit.checkedDate);
  const today = dayjs().startOf("day");
  const todayStr = today.format("YYYY-MM-DD");
  const todayDate = today.date();

  // 오늘이 스케줄에 없거나 체크하지 않았으면 0
  if (!scheduleDays.includes(todayDate) || !checkedDateSet.has(todayStr)) {
    return 0;
  }

  // 스케줄에 해당하는 체크된 날짜들만 필터링 (이미 정렬되어 있음)
  const scheduledCheckedDates = habit.checkedDate.filter((date) => {
    const checkDate = dayjs(date);
    return scheduleDays.includes(checkDate.date());
  });

  if (scheduledCheckedDates.length === 0) return 0;

  let consecutiveDays = 1;
  let currentDate = dayjs(scheduledCheckedDates[0]);

  // 이전 체크된 날짜들을 확인하여 연속성 계산
  for (let i = 1; i < scheduledCheckedDates.length; i++) {
    const previousDate = dayjs(scheduledCheckedDates[i]);
    const daysDiff = currentDate.diff(previousDate, "day");

    // 스케줄된 날짜들 사이의 최대 간격 계산
    const maxGap = Math.max(
      ...scheduleDays.map((day, index) => {
        if (index === scheduleDays.length - 1) {
          // 마지막 날짜와 다음 달 첫 번째 날짜 사이의 간격
          return 31 - day + scheduleDays[0];
        }
        return scheduleDays[index + 1] - day;
      }),
    );

    if (daysDiff <= maxGap) {
      consecutiveDays++;
      currentDate = previousDate;
    } else {
      break;
    }
  }

  return consecutiveDays;
};

// 주간 스케줄의 최대 간격 계산
const calcMaxWeeklyGap = (scheduleDays: number[]): number => {
  let maxGap = 0;

  for (let i = 0; i < scheduleDays.length - 1; i++) {
    const currentDay = scheduleDays[i];
    const nextDay = scheduleDays[i + 1];
    const gap = nextDay > currentDay ? nextDay - currentDay : 7 - currentDay + nextDay;
    maxGap = Math.max(maxGap, gap);
  }

  // 마지막 날짜와 첫 번째 날짜 사이의 간격
  const lastToFirstGap = 7 - scheduleDays[scheduleDays.length - 1] + scheduleDays[0];
  return Math.max(maxGap, lastToFirstGap);
};

// 메인 연속일 계산 함수
export const calculateConsecutiveDays = (habit: Habit): number => {
  switch (habit.frequency) {
    case "daily":
      return calcDaily(habit.checkedDate || []);
    case "weekly":
      return calcWeekly(habit);
    case "monthly":
      return calcMonthly(habit);
    default:
      return 0;
  }
};
