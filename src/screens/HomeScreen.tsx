import {StyleSheet, FlatList, View} from "react-native";
import {Habit, Empty, SelectedDate, TotalHabit} from "@/components/habit";
import {useHabitStore} from "@/store/useHabitStore";
import {RootStackNavigationProp} from "@/types/navigation";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {FloatingButton} from "@/components/button/Index";
import {useHabitActions} from "@/hooks/useHabitActions";

const HomeScreen = ({navigation}: {navigation: RootStackNavigationProp}) => {
  const {habits} = useHabitStore();
  const {top, bottom} = useSafeAreaInsets();
  const {handleHabitPress, handleHabitCheck, handleDeleteHabit} = useHabitActions();

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <SelectedDate />
      {habits.length > 0 && <TotalHabit />}
      <FlatList
        data={habits}
        renderItem={({item}: {item: any}) => <Habit habit={item} onPress={() => handleHabitPress(item)} onPressCheck={() => handleHabitCheck(item)} onPressDelete={() => handleDeleteHabit(item)} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContainer, habits.length === 0 && styles.emptyContainer]}
        ListEmptyComponent={<Empty />}
        scrollEnabled={habits.length > 0}
        ListFooterComponent={<View style={{height: bottom + 60}} />}
        showsVerticalScrollIndicator={false}
      />
      <FloatingButton onPress={() => navigation.navigate("CreateHabit", {habit: undefined})} />
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
  listContainer: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
