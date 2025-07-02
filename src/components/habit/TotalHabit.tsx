import {StyleSheet, Text, View} from "react-native";
import React, {useEffect} from "react";
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from "react-native-reanimated";
import {useHabitStore} from "@/store/useHabitStore";
import {calculateWeeklyProgress} from "@/utils/habitStats";
import {getSelectedDateCheckedHabitsCount, getScheduledHabits} from "@/utils/habitFilter";

const TotalHabit = () => {
  const {habits, selectedDate} = useHabitStore();
  const {progressPercentage, totalActualChecks, totalPossibleChecks} = calculateWeeklyProgress(habits);
  const selectedDateCompleted = getSelectedDateCheckedHabitsCount(habits, selectedDate);
  const todayScheduledHabits = getScheduledHabits(habits, selectedDate);

  const progressAnim = useSharedValue(0);

  useEffect(() => {
    progressAnim.value = withTiming(progressPercentage, {
      duration: 500,
    });
  }, [progressPercentage, progressAnim, habits]);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressAnim.value}%`,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{todayScheduledHabits.length}</Text>
          <Text style={styles.statLabel}>오늘의 습관</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{selectedDateCompleted}</Text>
          <Text style={styles.statLabel}>완료한 습관</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{progressPercentage}%</Text>
          <Text style={styles.statLabel}>이번주 진행률</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, animatedProgressStyle]} />
        </View>
        <Text style={styles.progressText}>
          {totalActualChecks} / {totalPossibleChecks} 완료
        </Text>
      </View>
    </View>
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
