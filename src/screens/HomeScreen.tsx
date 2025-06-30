import {StyleSheet, FlatList} from "react-native";
import {Habit, Empty} from "@/components/habit";
import {useHabitStore} from "@/store/useHabitStore";

const HomeScreen = () => {
  const habits = useHabitStore((state) => state.habits);

  return (
    <FlatList
      data={habits}
      renderItem={({item}) => <Habit habit={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<Empty />}
      scrollEnabled={habits.length > 0}
    />
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
});
