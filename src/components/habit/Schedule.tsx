import React, {useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {HabitFrequency} from "@/types/habit";

interface FrequencyOption {
  id: string;
  label: string;
  value: string;
}

interface ScheduleProps {
  onFrequencyChange?: (frequency: HabitFrequency) => void;
  selectedFrequency?: HabitFrequency;
}

const Schedule = ({onFrequencyChange, selectedFrequency}: ScheduleProps) => {
  const frequencyOptions: FrequencyOption[] = [
    {id: "daily", label: "매일", value: "daily"},
    {id: "weekly", label: "주간", value: "weekly"},
    {id: "monthly", label: "월간", value: "monthly"},
  ];

  const handleSelect = (frequency: HabitFrequency) => {
    onFrequencyChange?.(frequency);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>빈도 선택</Text>
      <View style={styles.optionsContainer}>
        {frequencyOptions.map((option) => (
          <TouchableOpacity key={option.id} style={[styles.option, selectedFrequency === option.value && styles.selectedOption]} onPress={() => handleSelect(option.value)} activeOpacity={0.7}>
            <Text style={[styles.optionText, selectedFrequency === option.value && styles.selectedOptionText]}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Schedule;

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
  optionsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedOption: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  selectedOptionText: {
    color: "#fff",
  },
});
