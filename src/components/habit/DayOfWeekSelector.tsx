import React, {useCallback} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {DayOfWeek} from "@/types/habit";
import {DAY_OF_WEEK_OPTIONS} from "@/constants/days";

interface DayOfWeekSelectorProps {
  selectedDays: DayOfWeek[];
  onDaysChange: React.Dispatch<React.SetStateAction<DayOfWeek[]>>;
}

const DayOfWeekSelector = ({selectedDays, onDaysChange}: DayOfWeekSelectorProps) => {
  const handleDayToggle = useCallback(
    (day: DayOfWeek) => {
      onDaysChange((prev: DayOfWeek[]) => {
        if (prev.includes(day)) {
          return prev.filter((d) => d !== day);
        } else {
          return [...prev, day];
        }
      });
    },
    [onDaysChange],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>요일 선택</Text>
      <View style={styles.daysContainer}>
        {DAY_OF_WEEK_OPTIONS.map((day) => (
          <TouchableOpacity key={day.value} style={[styles.dayButton, selectedDays.includes(day.value) && styles.selectedDayButton]} onPress={() => handleDayToggle(day.value)} activeOpacity={0.7}>
            <Text style={[styles.dayText, selectedDays.includes(day.value) && styles.selectedDayText]}>{day.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DayOfWeekSelector;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  dayButton: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDayButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  selectedDayText: {
    color: "#fff",
  },
});
