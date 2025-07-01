import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useMemo} from "react";
import {Habit as HabitType} from "@/types/habit";
import {useHabitStore} from "@/store/useHabitStore";
import dayjs from "dayjs";

interface HabitProps {
  habit: HabitType;
  onPress: () => void;
  onPressCheck: () => void;
  onPressDelete: () => void;
  showCheck?: boolean;
}

const Habit = ({habit, onPress, onPressCheck, onPressDelete, showCheck = true}: HabitProps) => {
  const {selectedDate} = useHabitStore();

  // 연속 체크 일수를 계산하는 함수 (메모이제이션)
  const consecutiveDays = useMemo(() => {
    if (!habit.checkedDate || habit.checkedDate.length === 0) {
      return 0;
    }

    // 체크된 날짜들을 Set으로 변환하여 O(1) 검색 가능하게 함
    const checkedDateSet = new Set(habit.checkedDate.map((date) => dayjs(date).format("YYYY-MM-DD")));

    // 오늘 날짜
    const today = dayjs().startOf("day").format("YYYY-MM-DD");

    // 오늘 체크했는지 확인
    if (!checkedDateSet.has(today)) {
      return 0; // 오늘 체크하지 않았으면 연속이 끊어진 것
    }

    let consecutiveDays = 1; // 오늘은 체크했으므로 1부터 시작
    let currentDate = dayjs(today);

    // 어제부터 역순으로 연속된 날짜 확인 (끊어질 때까지)
    while (true) {
      const previousDate = currentDate.subtract(1, "day").format("YYYY-MM-DD");

      if (checkedDateSet.has(previousDate)) {
        consecutiveDays++;
        currentDate = dayjs(previousDate);
      } else {
        break; // 연속이 끊어지면 종료
      }
    }

    return consecutiveDays;
  }, [habit.checkedDate]);

  // 반복 주기 정보를 표시하는 함수
  const getFrequencyText = () => {
    switch (habit.frequency) {
      case "daily":
        return "매일";
      case "weekly":
        if (habit.schedule && Array.isArray(habit.schedule)) {
          const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
          const selectedDays = habit.schedule.map((day) => daysOfWeek[day]).join(", ");
          return `매주 ${selectedDays}`;
        }
        return "매주";
      case "monthly":
        if (habit.schedule && Array.isArray(habit.schedule)) {
          const selectedDays = habit.schedule.map((day) => `${day}일`).join(", ");
          return `매월 ${selectedDays}`;
        }
        return "매월";
      default:
        return "";
    }
  };

  const isChecked = habit.checkedDate?.includes(selectedDate) || false;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onPressDelete}>
      <Text style={styles.name}>{habit.title}</Text>
      <Text style={styles.frequency}>{getFrequencyText()}</Text>
      {consecutiveDays > 0 && <Text style={styles.consecutiveDays}>🔥 {consecutiveDays}일 연속</Text>}
      {showCheck && (
        <TouchableOpacity style={[styles.checkButton, {backgroundColor: isChecked ? "#2196F3" : "#9E9E9E"}]} onPress={onPressCheck}>
          <Text style={styles.checkIcon}>✓</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default Habit;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  frequency: {
    fontSize: 14,
    color: "#2196F3",
    fontWeight: "500",
    marginBottom: 2,
  },
  consecutiveDays: {
    fontSize: 12,
    color: "#FF6B35",
    fontWeight: "600",
  },
  checkButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#9E9E9E",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  checkIcon: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
