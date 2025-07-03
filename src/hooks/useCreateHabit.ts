import {useEffect, useLayoutEffect, useState} from "react";
import {Alert} from "react-native";
import {useHabitStore} from "@/store/useHabitStore";
import {DayOfWeek, DayOfMonth, HabitFrequency, Habit} from "@/types/habit";
import {useNavigation} from "@react-navigation/native";
import {RootStackNavigationProp} from "@/types/navigation";

export const useCreateHabit = (habit?: Habit) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState<HabitFrequency>("daily");
  const [weeklySchedule, setWeeklySchedule] = useState<DayOfWeek[]>([]);
  const [monthlySchedule, setMonthlySchedule] = useState<DayOfMonth[]>([]);

  const {addHabit, editHabit} = useHabitStore();
  const isEdit = !!habit;

  // 네비게이션 타이틀 설정
  useLayoutEffect(() => {
    navigation.setOptions({title: habit ? "습관 수정" : "습관 생성"});
  }, [navigation, habit]);

  // 편집 모드일 때 초기값 설정
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

  // 유효성 검사
  const validateForm = (): boolean => {
    if (!habitName.trim()) {
      Alert.alert("습관 이름을 입력해주세요.");
      return false;
    }

    if (frequency === "weekly" && weeklySchedule.length === 0) {
      Alert.alert("요일을 선택해주세요.");
      return false;
    }

    if (frequency === "monthly" && monthlySchedule.length === 0) {
      Alert.alert("일자를 선택해주세요.");
      return false;
    }

    return true;
  };

  // 스케줄 정렬
  const getSortedSchedule = () => {
    return frequency === "weekly" ? weeklySchedule.sort((a, b) => a - b) : monthlySchedule.sort((a, b) => a - b);
  };

  // 습관 생성/수정 처리
  const handleCreateHabit = () => {
    if (!validateForm()) return;

    const sortedSchedule = getSortedSchedule();

    if (isEdit && habit) {
      editHabit({
        ...habit,
        title: habitName.trim(),
        frequency,
        schedule: sortedSchedule,
        checkedDate: [],
      });
    } else {
      addHabit({
        id: Date.now().toString(),
        title: habitName.trim(),
        frequency,
        schedule: sortedSchedule,
        createdAt: new Date(),
        checkedDate: [],
      });
    }

    navigation.goBack();
  };

  return {
    habitName,
    setHabitName,
    frequency,
    setFrequency,
    weeklySchedule,
    setWeeklySchedule,
    monthlySchedule,
    setMonthlySchedule,
    isEdit,
    handleCreateHabit,
  };
};
