import {StyleSheet, FlatList, View, Alert} from "react-native";
import {Empty, Habit} from "@/components/habit";
import {useHabitStore} from "@/store/useHabitStore";
import {RootStackNavigationProp} from "@/types/navigation";
import {useCallback} from "react";
import {Habit as HabitType} from "@/types/habit";
import {FloatingButton} from "@/components/button/Index";

const AllHabitsScreen = ({navigation}: {navigation: RootStackNavigationProp}) => {
  const {habits, checkHabit, deleteHabit} = useHabitStore();

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

  const renderHabitItem = useCallback(
    ({item}: {item: HabitType}) => (
      <Habit
        habit={item}
        onPress={() => handleHabitPress(item)}
        onPressCheck={() => handleHabitCheck(item)}
        onPressDelete={() => handleDeleteHabit(item)}
        showCheck={false}
      />
    ),
    [handleHabitPress, handleHabitCheck, handleDeleteHabit],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        renderItem={renderHabitItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Empty />}
        showsVerticalScrollIndicator={false}
      />

      <FloatingButton onPress={() => navigation.navigate("CreateHabit", {habit: undefined})} />
    </View>
  );
};

export default AllHabitsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  listContainer: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 24,
    textAlign: "center",
  },
  createButton: {
    backgroundColor: "#3498db",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
