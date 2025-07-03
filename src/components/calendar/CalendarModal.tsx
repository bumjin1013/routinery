import {StyleSheet, View, Modal, Pressable} from "react-native";
import React from "react";
import {CalendarHeader, WeekHeader, CalendarGrid} from "@/components/calendar";
import {useCalendarModal} from "@/hooks/useCalendarModal";
import Button from "../button/Button";

interface CalendarProps {
  visible: boolean;
  onClose: () => void;
}

const CalendarModal = ({visible, onClose}: CalendarProps) => {
  const {currentDate, selectedDate, goToPreviousMonth, goToNextMonth, handleDateSelect, handleConfirm, isConfirmDisabled} = useCalendarModal(onClose);

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Pressable style={styles.modalOverlay} onPress={onClose} />
        <View style={styles.modalContent}>
          <CalendarHeader currentDate={currentDate} onPreviousMonth={goToPreviousMonth} onNextMonth={goToNextMonth} />
          <WeekHeader />
          <CalendarGrid currentDate={currentDate} selectedDate={selectedDate} onDateSelect={handleDateSelect} />
          <Button title="확인" onPress={handleConfirm} disabled={isConfirmDisabled} />
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
