import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

interface FloatingButtonProps {
  onPress: () => void;
  icon?: string;
}

const FloatingButton = ({onPress, icon = "+"}: FloatingButtonProps) => {
  const {bottom} = useSafeAreaInsets();

  return (
    <TouchableOpacity style={[styles.floatingButton, {bottom: bottom + 20}]} onPress={onPress}>
      <Text style={styles.buttonText}>{icon}</Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
