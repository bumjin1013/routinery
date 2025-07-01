import {StyleSheet, FlatList, View} from "react-native";
import {Habit, Empty, SelectedDate} from "@/components/habit";
import {useHabitStore} from "@/store/useHabitStore";
import {RootStackNavigationProp} from "@/types/navigation";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useState} from "react";
import {CalendarModal} from "@/components/calendar";
import {FloatingButton} from "@/components/button/Index";

const HomeScreen = ({navigation}: {navigation: RootStackNavigationProp}) => {
  const {habits} = useHabitStore();
  const {top} = useSafeAreaInsets();

  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <SelectedDate onPress={() => setIsCalendarModalVisible(true)} />
      <FlatList
        data={habits}
        renderItem={({item}) => <Habit habit={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        ListEmptyComponent={<Empty />}
        scrollEnabled={habits.length > 0}
      />
      <FloatingButton onPress={() => navigation.navigate("CreateHabit")} />
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
