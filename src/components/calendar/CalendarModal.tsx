import {StyleSheet, View, Modal, Pressable} from "react-native";
import React from "react";
import {Dayjs} from "dayjs";
import {CalendarHeader, WeekHeader, CalendarGrid, ConfirmButton} from "@/components/calendar";
import {useCalendar} from "@/hooks/useCalendar";
import {useHabitStore} from "@/store/useHabitStore";

interface CalendarProps {
  visible: boolean;
  onClose: () => void;
  onConfirm?: (selectedDate: Dayjs) => void;
}

const CalendarModal = ({visible, onClose, onConfirm}: CalendarProps) => {
  const {currentDate, selectedDate, setSelectedDate, goToPreviousMonth, goToNextMonth} = useCalendar();
  const {setSelectedDate: setStoreSelectedDate} = useHabitStore();

  const handleDateSelect = (day: number) => {
    const newSelectedDate = currentDate.date(day);
    setSelectedDate(newSelectedDate);
  };

  const handleConfirm = () => {
    if (selectedDate) {
      setStoreSelectedDate(selectedDate.toDate());

      if (onConfirm) {
        onConfirm(selectedDate);
      }
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Pressable style={styles.modalOverlay} onPress={onClose} />
        <View style={styles.modalContent}>
          <CalendarHeader currentDate={currentDate} onPreviousMonth={goToPreviousMonth} onNextMonth={goToNextMonth} />
          <WeekHeader />
          <CalendarGrid currentDate={currentDate} selectedDate={selectedDate} onDateSelect={handleDateSelect} />
          <ConfirmButton selectedDate={selectedDate} onConfirm={handleConfirm} />
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: "90%",
    maxWidth: 400,
    alignSelf: "center",
  },
});
