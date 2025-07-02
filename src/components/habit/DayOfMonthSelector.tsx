import React, {useCallback, useMemo} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {DayOfMonth} from "@/types/habit";

interface DayOfMonthSelectorProps {
  selectedDays: DayOfMonth[];
  onDaysChange: (days: DayOfMonth[]) => void;
}

const DayOfMonthSelector = ({selectedDays, onDaysChange}: DayOfMonthSelectorProps) => {
  const dayOptions: DayOfMonth[] = useMemo(() => Array.from({length: 31}, (_, i) => (i + 1) as DayOfMonth), []);

  const handleDayToggle = useCallback(
    (day: DayOfMonth) => {
      if (selectedDays.includes(day)) {
        onDaysChange(selectedDays.filter((d) => d !== day));
      } else {
        onDaysChange([...selectedDays, day]);
      }
    },
    [selectedDays, onDaysChange],
  );

  const renderDayButton = useCallback(
    (day: DayOfMonth) => (
      <TouchableOpacity key={day} style={[styles.dayButton, selectedDays.includes(day) && styles.selectedDayButton]} onPress={() => handleDayToggle(day)} activeOpacity={0.7}>
        <Text style={[styles.dayText, selectedDays.includes(day) && styles.selectedDayText]}>{day}</Text>
      </TouchableOpacity>
    ),
    [selectedDays, handleDayToggle],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>일자 선택</Text>
      <View style={styles.daysContainer}>{dayOptions.map(renderDayButton)}</View>
    </View>
  );
};

export default DayOfMonthSelector;

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
  scrollView: {
    maxHeight: 200,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  dayButton: {
    width: 40,
    height: 40,
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
