import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Habit as HabitType} from "@/types/habit";
import {useHabitStore} from "@/store/useHabitStore";

interface HabitProps {
  habit: HabitType;
  onPress: () => void;
  onPressCheck: () => void;
  onPressDelete: () => void;
}

const Habit = ({habit, onPress, onPressCheck, onPressDelete}: HabitProps) => {
  const {selectedDate} = useHabitStore();
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

  const isChecked = habit.checkedDate && habit.checkedDate.includes(selectedDate);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onPressDelete}>
      <Text style={styles.name}>{habit.title}</Text>
      <Text style={styles.frequency}>{getFrequencyText()}</Text>
      <TouchableOpacity style={[styles.checkButton, {backgroundColor: isChecked ? "#2196F3" : "#9E9E9E"}]} onPress={onPressCheck}>
        <Text style={styles.checkIcon}>✓</Text>
      </TouchableOpacity>
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
