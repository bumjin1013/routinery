import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useMemo} from "react";
import {Habit as HabitType} from "@/types/habit";
import {useHabitStore} from "@/store/useHabitStore";
import {calculateConsecutiveDays} from "@/utils/consecutiveDays";
import {getScheduledHabits} from "@/utils/habitFilter";
import ScheduleDisplay from "./ScheduleDisplay";

interface HabitProps {
  habit: HabitType;
  onPress: () => void;
  onPressCheck: () => void;
  onPressDelete: () => void;
  showCheck?: boolean;
}

const Habit = ({habit, onPress, onPressCheck, onPressDelete, showCheck = true}: HabitProps) => {
  const {selectedDate} = useHabitStore();

  // 연속 체크 계산
  const consecutiveDays = useMemo(() => {
    return calculateConsecutiveDays(habit);
  }, [habit]);

  // 선택된 날짜에 체크 가능한지
  const isCheckable = useMemo(() => {
    const scheduledHabits = getScheduledHabits([habit], selectedDate);
    console.log("af", scheduledHabits);
    return scheduledHabits.length > 0;
  }, [habit, selectedDate]);

  const isChecked = habit.checkedDate?.includes(selectedDate) || false;

  return (
    <TouchableOpacity style={[styles.container, {opacity: isCheckable ? 1 : 0.5}]} onPress={onPress} onLongPress={onPressDelete}>
      <Text style={styles.name}>{habit.title}</Text>
      <ScheduleDisplay habit={habit} />
      {consecutiveDays > 0 && <Text style={styles.consecutiveDays}>🔥 {consecutiveDays}일 연속</Text>}
      {showCheck && (
        <TouchableOpacity
          style={[styles.checkButton, {backgroundColor: isChecked ? "#2196F3" : "#9E9E9E", opacity: isCheckable ? 1 : 0.5}]}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={isCheckable ? onPressCheck : undefined}>
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
