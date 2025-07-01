import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

const CloseButton = ({onClose}: {onClose: () => void}) => {
  return (
    <View style={styles.closeButtonContainer}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CloseButton;

const styles = StyleSheet.create({
  closeButtonContainer: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
