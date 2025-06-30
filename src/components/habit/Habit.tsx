import {StyleSheet, Text, View} from "react-native";

interface HabitProps {
  habit: {
    id: string;
    name: string;
    createdAt: Date;
  };
}

const Habit = ({habit}: HabitProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{habit.name}</Text>
      <Text style={styles.date}>{habit.createdAt.toLocaleDateString()}</Text>
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
});
