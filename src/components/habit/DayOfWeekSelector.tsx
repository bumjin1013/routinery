import React from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {DayOfWeek} from "@/types/habit";

interface DayOfWeekSelectorProps {
  selectedDays: DayOfWeek[];
  onDaysChange: (days: DayOfWeek[]) => void;
}

const DayOfWeekSelector = ({selectedDays, onDaysChange}: DayOfWeekSelectorProps) => {
  const dayOptions: {value: DayOfWeek; label: string}[] = [
    {value: "sunday", label: "일"},
    {value: "monday", label: "월"},
    {value: "tuesday", label: "화"},
    {value: "wednesday", label: "수"},
    {value: "thursday", label: "목"},
    {value: "friday", label: "금"},
    {value: "saturday", label: "토"},
  ];

  const handleDayToggle = (day: DayOfWeek) => {
    if (selectedDays.includes(day)) {
      onDaysChange(selectedDays.filter((d) => d !== day));
    } else {
      onDaysChange([...selectedDays, day]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>요일 선택</Text>
      <View style={styles.daysContainer}>
        {dayOptions.map((day) => (
          <TouchableOpacity
            key={day.value}
            style={[styles.dayButton, selectedDays.includes(day.value) && styles.selectedDayButton]}
            onPress={() => handleDayToggle(day.value)}
            activeOpacity={0.7}>
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
