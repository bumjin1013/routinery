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

// 이번주 진행률 계산
export const calculateWeeklyProgress = (habits: Habit[]) => {
  const {start, end, days} = getWeekRange();
  const weekDays = days;

  let totalPossibleChecks = 0;
  let totalActualChecks = 0;

  habits.forEach((habit) => {
    // 각 습관의 이번주 체크 가능 횟수 계산
    let possibleChecks = 0;
    let actualChecks = 0;

    // checkedDate가 undefined인 경우 빈 배열로 처리
    const checkedDates = habit.checkedDate || [];

    // 일일 습관
    if (habit.frequency === "daily") {
      possibleChecks = weekDays;
      actualChecks = checkedDates.filter((date) => {
        const checkDate = dayjs(date);
        return checkDate.isBetween(start, end, "day", "[]");
      }).length;
    }
    // 주간 습관
    else if (habit.frequency === "weekly") {
      if (habit.schedule) {
        possibleChecks = habit.schedule.length;
        actualChecks = checkedDates.filter((date) => {
          const checkDate = dayjs(date);
          return checkDate.isBetween(start, end, "day", "[]");
        }).length;
      }
    }
    // 월간 습관
    else if (habit.frequency === "monthly") {
      if (habit.schedule) {
        const currentMonth = dayjs().month();
        const currentYear = dayjs().year();

        // 이번주에 해당하는 월간 습관 날짜들 확인
        const weekSchedule = habit.schedule.filter((day) => {
          const scheduleDate = dayjs(`${currentYear}-${currentMonth + 1}-${day}`);
          return scheduleDate.isBetween(start, end, "day", "[]");
        });

        possibleChecks = weekSchedule.length;
        actualChecks = checkedDates.filter((date) => {
          const checkDate = dayjs(date);
          return checkDate.isBetween(start, end, "day", "[]");
        }).length;
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

// 오늘 완료된 습관 개수
export const getTodayCompletedHabits = (habits: Habit[]) => {
  const today = dayjs().format("YYYY-MM-DD");
  return habits.filter((habit) => {
    const checkedDates = habit.checkedDate || [];
    return checkedDates.includes(today);
  }).length;
};

// 이번주 완료된 습관 개수
export const getWeeklyCompletedHabits = (habits: Habit[]) => {
  const {start, end} = getWeekRange();
  return habits.filter((habit) => {
    const checkedDates = habit.checkedDate || [];
    return checkedDates.some((date) => {
      const checkDate = dayjs(date);
      return checkDate.isBetween(start, end, "day", "[]");
    });
  }).length;
};
