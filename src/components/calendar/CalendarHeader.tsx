import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from "react";
import {Dayjs} from "dayjs";

interface CalendarHeaderProps {
  currentDate: Dayjs;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader = ({currentDate, onPreviousMonth, onNextMonth}: CalendarHeaderProps) => {
  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPreviousMonth} style={styles.navButton}>
        <Text style={styles.navButtonText}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.monthYearText}>
        {currentDate.year()}년 {monthNames[currentDate.month()]}
      </Text>
      <TouchableOpacity onPress={onNextMonth} style={styles.navButton}>
        <Text style={styles.navButtonText}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CalendarHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
