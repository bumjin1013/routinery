import React, {useEffect, useLayoutEffect, useState} from "react";
import {StyleSheet, View, TextInput, Alert} from "react-native";
import {RootStackNavigationProp, RootStackParamList} from "@/types/navigation";
import Button from "@/components/button/Button";
import {DayOfWeekSelector, DayOfMonthSelector, Schedule} from "@/components/habit";
import {useHabitStore} from "@/store/useHabitStore";
import {DayOfWeek, DayOfMonth, HabitFrequency} from "@/types/habit";
import {RouteProp} from "@react-navigation/native";

const CreateHabitScreen = ({navigation, route}: {navigation: RootStackNavigationProp; route: RouteProp<RootStackParamList, "CreateHabit">}) => {
  const {habit} = route.params || {};

  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState<HabitFrequency>("daily");

  const [weeklySchedule, setWeeklySchedule] = useState<DayOfWeek[]>([]);
  const [monthlySchedule, setMonthlySchedule] = useState<DayOfMonth[]>([]);

  const {addHabit, editHabit} = useHabitStore();

  const isEdit = !!habit;

  useLayoutEffect(() => {
    navigation.setOptions({title: habit ? "습관 수정" : "습관 생성"});
  }, [navigation, habit]);

  useEffect(() => {
    if (isEdit) {
      setHabitName(habit.title);
      setFrequency(habit.frequency);

      if (habit.frequency === "weekly" && habit.schedule) {
        setWeeklySchedule(habit.schedule as DayOfWeek[]);
      } else if (habit.frequency === "monthly" && habit.schedule) {
        setMonthlySchedule(habit.schedule as DayOfMonth[]);
      }
    }
  }, [isEdit, habit]);

  const handleCreateHabit = () => {
    if (habitName.trim()) {
      if (frequency === "weekly" && weeklySchedule?.length === 0) {
        Alert.alert("요일을 선택해주세요.");
        return;
      }
      if (frequency === "monthly" && monthlySchedule?.length === 0) {
        Alert.alert("일자를 선택해주세요.");
        return;
      }

      if (isEdit) {
        editHabit({
          ...habit,
          title: habitName.trim(),
          frequency,
          schedule: frequency === "weekly" ? weeklySchedule : monthlySchedule,
          checkedDate: [],
        });
      } else {
        addHabit({
          id: Date.now().toString(),
          title: habitName.trim(),
          frequency,
          schedule: frequency === "weekly" ? weeklySchedule : monthlySchedule,
          createdAt: new Date(),
          checkedDate: [],
        });
      }
      navigation.goBack();
    } else {
      Alert.alert("습관 이름을 입력해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="습관 이름을 입력하세요" value={habitName} onChangeText={setHabitName} autoFocus />
      <Schedule selectedFrequency={frequency} onFrequencyChange={setFrequency} />
      {frequency === "weekly" && <DayOfWeekSelector selectedDays={weeklySchedule} onDaysChange={setWeeklySchedule} />}
      {frequency === "monthly" && <DayOfMonthSelector selectedDays={monthlySchedule} onDaysChange={setMonthlySchedule} />}
      <Button title="습관 생성" onPress={handleCreateHabit} style={styles.button} bottom />
    </View>
  );
};

export default CreateHabitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    height: 40,
  },
  button: {
    marginTop: 10,
  },
});
