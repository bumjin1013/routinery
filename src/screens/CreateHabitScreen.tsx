import React from "react";
import {StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard} from "react-native";
import {RootStackNavigationProp, RootStackParamList} from "@/types/navigation";
import Button from "@/components/button/Button";
import {DayOfWeekSelector, DayOfMonthSelector, Schedule} from "@/components/habit";
import {RouteProp} from "@react-navigation/native";
import {useCreateHabit} from "@/hooks";

const CreateHabitScreen = ({route}: {navigation: RootStackNavigationProp; route: RouteProp<RootStackParamList, "CreateHabit">}) => {
  const {habit} = route.params || {};

  const {habitName, setHabitName, frequency, setFrequency, weeklySchedule, setWeeklySchedule, monthlySchedule, setMonthlySchedule, handleCreateHabit} = useCreateHabit(habit);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="습관 이름을 입력하세요" value={habitName} onChangeText={setHabitName} autoFocus />
        <Schedule selectedFrequency={frequency} onFrequencyChange={setFrequency} />
        {frequency === "weekly" && <DayOfWeekSelector selectedDays={weeklySchedule} onDaysChange={setWeeklySchedule} />}
        {frequency === "monthly" && <DayOfMonthSelector selectedDays={monthlySchedule} onDaysChange={setMonthlySchedule} />}
        <Button title="습관 생성" onPress={handleCreateHabit} style={styles.button} bottom />
      </View>
    </TouchableWithoutFeedback>
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
