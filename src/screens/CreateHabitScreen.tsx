import React, {useState} from "react";
import {StyleSheet, Text, View, TextInput, Alert} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {RootStackNavigationProp} from "@/types/navigation";
import Button from "@/components/button/Button";
import FrequencySelector from "@/components/habit/FrequencySelector";
import {DayOfWeekSelector, DayOfMonthSelector} from "@/components/habit";
import {useHabitStore} from "@/store/useHabitStore";
import {DayOfWeek, DayOfMonth} from "@/types/habit";

const CreateHabitScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [selectedWeekDays, setSelectedWeekDays] = useState<DayOfWeek[]>([]);
  const [selectedMonthDays, setSelectedMonthDays] = useState<DayOfMonth[]>([]);
  const {addHabit} = useHabitStore();

  const handleCreateHabit = () => {
    if (habitName.trim()) {
      // 빈도에 따른 유효성 검사
      if (frequency === "weekly" && selectedWeekDays.length === 0) {
        Alert.alert("요일을 선택해주세요.");
        return;
      }
      if (frequency === "monthly" && selectedMonthDays.length === 0) {
        Alert.alert("일자를 선택해주세요.");
        return;
      }

      addHabit(habitName.trim());
      navigation.goBack();
    } else {
      Alert.alert("습관 이름을 입력해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="습관 이름을 입력하세요" value={habitName} onChangeText={setHabitName} autoFocus />
      <FrequencySelector selectedFrequency={frequency} onFrequencyChange={setFrequency} />

      {frequency === "weekly" && <DayOfWeekSelector selectedDays={selectedWeekDays} onDaysChange={setSelectedWeekDays} />}

      {frequency === "monthly" && <DayOfMonthSelector selectedDays={selectedMonthDays} onDaysChange={setSelectedMonthDays} />}

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
