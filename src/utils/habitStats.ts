import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {Habit} from "@/types/habit";

dayjs.extend(isBetween);

// 이번주 시작일과 종료일 계산
export const getWeekRange = () => {
  const today = dayjs();
  const startOfWeek = today.startOf("week");
  const endOfWeek = today.endOf("week");

  return {
    start: startOfWeek,
    end: endOfWeek,
    days: endOfWeek.diff(startOfWeek, "day") + 1,
  };
};

// 날짜가 주 범위 내에 있는지
const isDateInWeekRange = (dateStr: string, start: dayjs.Dayjs, end: dayjs.Dayjs): boolean => {
  const date = dayjs(dateStr);
  return date.isBetween(start, end, "day", "[]");
};

// 이번주 진행률 계산
export const calculateWeeklyProgress = (habits: Habit[]) => {
  const {start, end, days} = getWeekRange();
  const weekDays = days;

  let totalPossibleChecks = 0;
  let totalActualChecks = 0;

  habits.forEach((habit) => {
    let possibleChecks = 0;
    let actualChecks = 0;

    const checkedDates = habit.checkedDate || [];

    // 일일 습관
    if (habit.frequency === "daily") {
      possibleChecks = weekDays;
      // 한 번에 모든 날짜를 필터링
      actualChecks = checkedDates.filter((date) => isDateInWeekRange(date, start, end)).length;
    }
    // 주간 습관
    else if (habit.frequency === "weekly") {
      if (habit.schedule) {
        possibleChecks = habit.schedule.length;
        actualChecks = checkedDates.filter((date) => isDateInWeekRange(date, start, end)).length;
      }
    }
    // 월간 습관
    else if (habit.frequency === "monthly") {
      if (habit.schedule) {
        const currentMonth = dayjs().month();
        const currentYear = dayjs().year();

        // 월간 스케줄을 한 번에 계산
        const weekSchedule = habit.schedule.filter((day) => {
          const scheduleDate = dayjs(`${currentYear}-${currentMonth + 1}-${day}`);
          return scheduleDate.isBetween(start, end, "day", "[]");
        });

        possibleChecks = weekSchedule.length;
        actualChecks = checkedDates.filter((date) => isDateInWeekRange(date, start, end)).length;
      }
    }

    totalPossibleChecks += possibleChecks;
    totalActualChecks += actualChecks;
  });

  return {
    totalPossibleChecks,
    totalActualChecks,
    progressPercentage: totalPossibleChecks > 0 ? Math.round((totalActualChecks / totalPossibleChecks) * 100) : 0,
  };
};
