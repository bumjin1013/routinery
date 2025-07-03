import dayjs from "dayjs";
import {DayOfWeek, Habit} from "@/types/habit";

// 일일 습관의 연속일 계산
const calcDaily = (dates: string[]): number => {
  // 체크된 날짜가 없으면 0
  if (dates.length === 0) return 0;

  const dateSet = new Set(dates);
  const today = dayjs().startOf("day").format("YYYY-MM-DD");

  // 오늘이 체크되지 않았으면 가장 최근 체크된 날짜부터 계산
  let startDate = today;
  if (!dateSet.has(today)) {
    // 가장 최근 체크된 날짜 찾기
    const sortedDates = dates.sort().reverse();
    if (sortedDates.length === 0) return 0;

    const mostRecentDate = dayjs(sortedDates[0]);
    const yesterday = dayjs().subtract(1, "day").startOf("day");

    // 가장 최근 체크된 날짜가 어제보다 이전이면 연속이 끊어진 것
    if (mostRecentDate.isBefore(yesterday)) {
      return 0;
    }

    startDate = sortedDates[0];
  }

  let count = 1;
  let current = dayjs(startDate);

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

// 주간/월간 습관의 연속일 계산 (공통 함수)
const calcScheduled = (habit: Habit): number => {
  const cycle = habit.frequency === "weekly" ? 7 : 31;
  // 체크된 날짜가 없으면 0
  if (!habit.checkedDate.length) {
    return 0;
  }

  const scheduleDays = habit.schedule as (DayOfWeek | number)[]; // 스케줄 (요일 또는 날짜)
  const checkedDateSet = new Set(habit.checkedDate); // 체크된 날짜 집합
  const today = dayjs().startOf("day"); // 오늘
  const todayStr = today.format("YYYY-MM-DD"); // 오늘 날짜

  // 오늘의 스케줄 값 (요일 또는 날짜)
  const todayScheduleValue = cycle === 7 ? today.day() : today.date();

  // 오늘이 스케줄에 있고 체크되었다면 오늘부터, 아니면 가장 최근 체크된 날짜부터 계산
  let currentDate: dayjs.Dayjs;
  if (scheduleDays.includes(todayScheduleValue) && checkedDateSet.has(todayStr)) {
    currentDate = today;
  } else {
    // 가장 최근 체크된 스케줄 날짜 찾기
    currentDate = dayjs(habit.checkedDate[0]);
  }

  let consecutiveDays = 1;
  const currentScheduleValue = cycle === 7 ? currentDate.day() : currentDate.date();
  let currentDayIdx = scheduleDays.indexOf(currentScheduleValue);

  // 스케줄 날짜와 체크된 날짜의 차이를 계산하여 연속성 체크
  for (let i = 1; i < habit.checkedDate.length; i++) {
    const previousDate = dayjs(habit.checkedDate[i]);

    // scheduleDays에서 이전 스케줄 인덱스
    const prevDayIdx = (currentDayIdx - 1 + scheduleDays.length) % scheduleDays.length;
    const prevScheduleValue = scheduleDays[prevDayIdx];

    // 현재 스케줄과 이전 스케줄의 차이(일수)
    let dayDiff: number;
    if (cycle === 7) {
      // 주간: 요일 차이 계산
      dayDiff = (currentDate.day() - (prevScheduleValue as DayOfWeek) + 7) % 7;
      if (dayDiff === 0) dayDiff = 7; // 같은 요일이면 7일 차이
    } else {
      // 월간: 날짜 차이 계산
      dayDiff = currentDate.date() - (prevScheduleValue as number);
      if (dayDiff <= 0) dayDiff += cycle; // 다음 주기로 넘어가는 경우
    }

    // 실제 날짜 차이
    const actualDiff = currentDate.diff(previousDate, "day");

    // 연속성 체크
    const previousScheduleValue = cycle === 7 ? previousDate.day() : previousDate.date();
    if (previousScheduleValue === prevScheduleValue && actualDiff === dayDiff) {
      consecutiveDays++;
      currentDate = previousDate;
      currentDayIdx = prevDayIdx;
    } else {
      break;
    }
  }

  return consecutiveDays;
};

// 메인 연속일 계산 함수
export const calculateConsecutiveDays = (habit: Habit): number => {
  switch (habit.frequency) {
    case "daily":
      return calcDaily(habit.checkedDate || []);
    case "weekly":
      return calcScheduled(habit);
    case "monthly":
      return calcScheduled(habit);
    default:
      return 0;
  }
};
