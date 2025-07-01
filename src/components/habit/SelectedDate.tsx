import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import dayjs from "dayjs";
import {useHabitStore} from "@/store/useHabitStore";

const SelectedDate = ({onPress}: {onPress: () => void}) => {
  const {selectedDate} = useHabitStore();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.date}>{dayjs(selectedDate).format("YYYY년 MM월 DD일")}</Text>
    </TouchableOpacity>
  );
};

export default SelectedDate;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 16,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
