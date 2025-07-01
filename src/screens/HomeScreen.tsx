import {StyleSheet, FlatList, View, Alert} from "react-native";
import {Habit, Empty, NoScheduledHabits, SelectedDate} from "@/components/habit";
import {useHabitStore} from "@/store/useHabitStore";
import {RootStackNavigationProp} from "@/types/navigation";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useState, useMemo, useCallback} from "react";
import {CalendarModal} from "@/components/calendar";
import {FloatingButton} from "@/components/button/Index";
import {DayOfWeek, DayOfMonth, Habit as HabitType} from "@/types/habit";
import dayjs from "dayjs";

const HomeScreen = ({navigation}: {navigation: RootStackNavigationProp}) => {
  const {habits, selectedDate, checkHabit, deleteHabit} = useHabitStore();
  const {top} = useSafeAreaInsets();

  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);

  const scheduledHabits = useMemo(() => {
    const currentDate = dayjs(selectedDate);
    const currentDayOfWeek = currentDate.day();
    const currentDayOfMonth = currentDate.date();

    return habits.filter((habit) => {
      switch (habit.frequency) {
        case "daily":
          return true;
        case "weekly":
          if (habit.schedule && Array.isArray(habit.schedule)) {
            return (habit.schedule as DayOfWeek[]).includes(currentDayOfWeek as DayOfWeek);
          }
          return false;
        case "monthly":
          if (habit.schedule && Array.isArray(habit.schedule)) {
            return (habit.schedule as DayOfMonth[]).includes(currentDayOfMonth as DayOfMonth);
          }
          return false;
        default:
          return false;
      }
    });
  }, [habits, selectedDate]);

  const handleHabitPress = useCallback(
    (habit: HabitType) => {
      navigation.navigate("CreateHabit", {habit});
    },
    [navigation],
  );

  const handleHabitCheck = useCallback(
    (habit: HabitType) => {
      checkHabit(habit.id);
    },
    [checkHabit],
  );

  const handleDeleteHabit = useCallback(
    (habit: HabitType) => {
      Alert.alert("습관 삭제", "정말 삭제하시겠습니까?", [
        {text: "취소", style: "cancel"},
        {text: "삭제", style: "destructive", onPress: () => deleteHabit(habit.id)},
      ]);
    },
    [deleteHabit],
  );

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <SelectedDate onPress={() => setIsCalendarModalVisible(true)} />
      <FlatList
        data={scheduledHabits}
        renderItem={({item}) => <Habit habit={item} onPress={() => handleHabitPress(item)} onPressCheck={() => handleHabitCheck(item)} onPressDelete={() => handleDeleteHabit(item)} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        ListEmptyComponent={habits.length === 0 ? <Empty /> : <NoScheduledHabits />}
        scrollEnabled={scheduledHabits.length > 0}
      />
      <FloatingButton onPress={() => navigation.navigate("CreateHabit", {habit: undefined})} />
      <CalendarModal visible={isCalendarModalVisible} onClose={() => setIsCalendarModalVisible(false)} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
});
