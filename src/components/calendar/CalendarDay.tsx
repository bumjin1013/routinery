import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";

interface CalendarDayProps {
  day: number;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  onPress: () => void;
}

const CalendarDay = ({day, isToday, isSelected, isDisabled, onPress}: CalendarDayProps) => {
  return (
    <TouchableOpacity style={styles.dayCell} onPress={onPress} disabled={isDisabled}>
      <Text style={[styles.dayText, isToday && styles.todayText, isSelected && styles.selectedText, isDisabled && styles.disabledText]}>{day}</Text>
    </TouchableOpacity>
  );
};

export default CalendarDay;

const styles = StyleSheet.create({
  dayCell: {
    width: "14.28%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  dayText: {
    fontSize: 16,
    color: "#333",
  },
  todayText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  selectedText: {
    backgroundColor: "#007AFF",
    color: "#fff",
    borderRadius: 20,
    width: 32,
    height: 32,
    textAlign: "center",
    lineHeight: 32,
    fontWeight: "bold",
  },
  disabledText: {
    color: "#ccc",
  },
});
