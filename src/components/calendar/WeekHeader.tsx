import {StyleSheet, Text, View} from "react-native";
import React from "react";

const WeekHeader = () => {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <View style={styles.weekHeader}>
      {dayNames.map((day, index) => (
        <View key={day} style={styles.dayHeader}>
          <Text style={[styles.dayHeaderText, index === 0 && styles.sundayText, index === 6 && styles.saturdayText]}>{day}</Text>
        </View>
      ))}
    </View>
  );
};

export default WeekHeader;

const styles = StyleSheet.create({
  weekHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  dayHeader: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  dayHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  sundayText: {
    color: "#ff6b6b",
  },
  saturdayText: {
    color: "#4ecdc4",
  },
});
