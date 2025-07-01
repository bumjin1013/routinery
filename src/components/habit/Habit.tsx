import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";

interface HabitProps {
  habit: {
    id: string;
    name: string;
    createdAt: Date;
  };
}

const Habit = ({habit}: HabitProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{habit.name}</Text>
      <Text style={styles.date}>{habit.createdAt.toLocaleDateString()}</Text>
      <TouchableOpacity style={[styles.checkButton, {backgroundColor: isChecked ? "#2196F3" : "#4CAF50"}]} onPress={handleCheck}>
        <Text style={styles.checkIcon}>✓</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Habit;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  checkButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  checkIcon: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
