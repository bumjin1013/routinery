import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import dayjs from "dayjs";
import {useHabitStore} from "@/store/useHabitStore";
import {CalendarModal} from "../calendar";

const SelectedDate = () => {
  const {selectedDate} = useHabitStore();
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => setIsCalendarModalVisible(true)}>
        <Text style={styles.date}>{dayjs(selectedDate).format("YYYY년 MM월 DD일")}</Text>
      </TouchableOpacity>
      <CalendarModal visible={isCalendarModalVisible} onClose={() => setIsCalendarModalVisible(false)} />
    </>
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
