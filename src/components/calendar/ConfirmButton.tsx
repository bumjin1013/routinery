import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {Dayjs} from "dayjs";

interface ConfirmButtonProps {
  selectedDate: Dayjs | null;
  onConfirm: () => void;
}

const ConfirmButton = ({selectedDate, onConfirm}: ConfirmButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.confirmButton, !selectedDate && styles.disabledButton]} onPress={onConfirm} disabled={!selectedDate}>
        <Text style={[styles.confirmButtonText, !selectedDate && styles.disabledButtonText]}>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
  },
  disabledButton: {
    backgroundColor: "#E5E5EA",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  disabledButtonText: {
    color: "#8E8E93",
  },
});
