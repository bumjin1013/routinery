import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {DAYS_OF_WEEK} from "@/constants/days";

const WeekHeader = () => {
  return (
    <View style={styles.weekHeader}>
      {DAYS_OF_WEEK.map((day, index) => (
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
