import {useCallback} from "react";
import {Alert} from "react-native";
import {useHabitStore} from "@/store/useHabitStore";
import {RootStackNavigationProp} from "@/types/navigation";
import {Habit as HabitType} from "@/types/habit";
import {useNavigation} from "@react-navigation/native";

export const useHabitActions = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const {checkHabit, deleteHabit} = useHabitStore();

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

  return {
    handleHabitPress,
    handleHabitCheck,
    handleDeleteHabit,
  };
};
