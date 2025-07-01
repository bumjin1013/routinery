import {StyleSheet, View} from "react-native";
import React from "react";
import {Dayjs} from "dayjs";
import dayjs from "dayjs";
import CalendarDay from "./CalendarDay";

interface CalendarGridProps {
  currentDate: Dayjs;
  selectedDate: Dayjs | null;
  onDateSelect: (day: number) => void;
}

const CalendarGrid = ({currentDate, selectedDate, onDateSelect}: CalendarGridProps) => {
  // 현재 월의 첫 번째 날과 마지막 날
  const getDaysInMonth = (date: Dayjs) => {
    const year = date.year();
    const month = date.month();
    const firstDay = dayjs().year(year).month(month).date(1);
    const lastDay = dayjs()
      .year(year)
      .month(month + 1)
      .date(0);
    const daysInMonth = lastDay.date();
    const firstDayOfWeek = firstDay.day();

    return {daysInMonth, firstDayOfWeek};
  };

  const {daysInMonth, firstDayOfWeek} = getDaysInMonth(currentDate);
  const today = dayjs();

  const renderCalendarDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<View key={`empty-${i}`} style={{width: "14.28%", height: 40, marginVertical: 2}} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.date() === day && today.month() === currentDate.month() && today.year() === currentDate.year();
      const isSelected = selectedDate ? selectedDate.date() === day && selectedDate.month() === currentDate.month() && selectedDate.year() === currentDate.year() : false;
      const currentDayDate = dayjs().year(currentDate.year()).month(currentDate.month()).date(day);
      const isDisabled = currentDayDate.isAfter(today, "day");

      days.push(<CalendarDay key={day} day={day} isToday={isToday} isSelected={isSelected} isDisabled={isDisabled} onPress={() => !isDisabled && onDateSelect(day)} />);
    }

    return days;
  };

  return <View style={styles.calendarGrid}>{renderCalendarDays()}</View>;
};

export default CalendarGrid;

const styles = StyleSheet.create({
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
