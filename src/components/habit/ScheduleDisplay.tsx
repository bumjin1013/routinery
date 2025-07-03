import {StyleSheet, Text, View} from "react-native";
import {Habit as HabitType} from "@/types/habit";
import {DAYS_OF_WEEK} from "@/constants/days";

interface ScheduleDisplayProps {
  habit: HabitType;
}

// 공통 스타일 계산 함수
const getDayStyle = (isChecked: boolean, isPast: boolean, isFuture: boolean, isToday: boolean) => {
  let backgroundColor = "#f0f0f0";
  let textColor = "#ccc";

  if (isChecked) {
    backgroundColor = "#2196F3";
    textColor = "#fff";
  } else if (isFuture) {
    backgroundColor = "#f0f0f0";
    textColor = "#999";
  } else if (isPast) {
    backgroundColor = "#FF5722";
    textColor = "#fff";
  } else if (isToday) {
    backgroundColor = "#fff";
    textColor = "#2196F3";
  }

  return {backgroundColor, textColor};
};

const DayCircle = ({day, isChecked, isPast, isFuture, isToday}: {day: string | number; isChecked: boolean; isPast: boolean; isFuture: boolean; isToday: boolean}) => {
  const {backgroundColor, textColor} = getDayStyle(isChecked, isPast, isFuture, isToday);

  return (
    <View style={[styles.dayCircle, isToday && !isChecked ? styles.todayCircle : {}, {backgroundColor}]}>
      <Text style={[styles.dayText, isToday && !isChecked ? styles.todayText : {}, {color: textColor}]}>{day}</Text>
    </View>
  );
};

const ScheduleDisplay = ({habit}: ScheduleDisplayProps) => {
  switch (habit.frequency) {
    case "daily":
      const today = new Date().getDay();
      return (
        <View style={styles.scheduleContainer}>
          {DAYS_OF_WEEK.map((day, index) => {
            const isPast = index < today;
            const isFuture = index > today;
            const isToday = index === today;

            // 해당 요일이 체크되었는지 확인
            const isChecked =
              habit.checkedDate?.some((date) => {
                const checkDate = new Date(date);
                return checkDate.getDay() === index;
              }) || false;

            return <DayCircle key={day} day={day} isChecked={isChecked} isPast={isPast} isFuture={isFuture} isToday={isToday} />;
          })}
        </View>
      );
    case "weekly":
      if (habit.schedule && Array.isArray(habit.schedule)) {
        const today = new Date().getDay();

        return (
          <View style={styles.scheduleContainer}>
            {DAYS_OF_WEEK.map((day, index) => {
              const isSelected = habit.schedule?.includes(index as any) || false;

              // 스케줄되지 않은 요일은 표시하지 않음
              if (!isSelected) {
                return null;
              }

              const isPast = index < today;
              const isFuture = index > today;
              const isToday = index === today;

              // 이번 주 해당 요일이 체크되었는지 확인
              const isChecked =
                habit.checkedDate?.some((date) => {
                  const checkDate = new Date(date);
                  const today = new Date();
                  const startOfWeek = new Date(today);
                  startOfWeek.setDate(today.getDate() - today.getDay());
                  startOfWeek.setHours(0, 0, 0, 0);

                  const endOfWeek = new Date(startOfWeek);
                  endOfWeek.setDate(startOfWeek.getDate() + 6);
                  endOfWeek.setHours(23, 59, 59, 999);

                  return checkDate.getDay() === index && checkDate >= startOfWeek && checkDate <= endOfWeek;
                }) || false;

              return <DayCircle key={day} day={day} isChecked={isChecked} isPast={isPast} isFuture={isFuture} isToday={isToday} />;
            })}
          </View>
        );
      }
      return null;
    case "monthly":
      if (habit.schedule && Array.isArray(habit.schedule)) {
        const today = new Date().getDate();
        return (
          <View style={styles.scheduleContainer}>
            {habit.schedule.map((day) => {
              const isPast = day < today;
              const isFuture = day > today;
              const isToday = day === today;

              // 이번 달 해당 일자가 체크되었는지 확인
              const isChecked =
                habit.checkedDate?.some((date) => {
                  const checkDate = new Date(date);
                  const today = new Date();
                  const currentMonth = today.getMonth();
                  const currentYear = today.getFullYear();

                  return checkDate.getDate() === day && checkDate.getMonth() === currentMonth && checkDate.getFullYear() === currentYear;
                }) || false;

              return <DayCircle key={day} day={day} isChecked={isChecked} isPast={isPast} isFuture={isFuture} isToday={isToday} />;
            })}
          </View>
        );
      }
      return null;
    default:
      return null;
  }
};

export default ScheduleDisplay;

const styles = StyleSheet.create({
  scheduleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 4,
  },
  dayCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
    marginBottom: 4,
  },
  dayText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#fff",
  },
  monthCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
    marginBottom: 4,
  },
  monthText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  todayCircle: {
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  todayText: {
    color: "#2196F3",
  },
});
