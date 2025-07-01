import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from "react";
import {useHabitStore} from "@/store/useHabitStore";
import {calculateWeeklyProgress, getTodayCompletedHabits} from "@/utils/habitStats";

const TotalHabit = ({onPress}: {onPress?: () => void}) => {
  const {habits} = useHabitStore();
  const {progressPercentage, totalActualChecks, totalPossibleChecks} = calculateWeeklyProgress(habits);
  const todayCompleted = getTodayCompletedHabits(habits);

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container style={styles.container} onPress={onPress}>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{habits.length}</Text>
          <Text style={styles.statLabel}>총 습관</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{todayCompleted}</Text>
          <Text style={styles.statLabel}>오늘 완료</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{progressPercentage}%</Text>
          <Text style={styles.statLabel}>이번주 진행률</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, {width: `${progressPercentage}%`}]} />
        </View>
        <Text style={styles.progressText}>
          {totalActualChecks} / {totalPossibleChecks} 완료
        </Text>
      </View>
    </Container>
  );
};

export default TotalHabit;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    textAlign: "center",
  },
  progressContainer: {
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#ecf0f1",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3498db",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#7f8c8d",
    fontWeight: "500",
  },
});
