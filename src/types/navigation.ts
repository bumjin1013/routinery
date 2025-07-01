import {StackNavigationProp} from "@react-navigation/stack";
import {Habit} from "./habit";

export type RootStackParamList = {
  Home: undefined;
  CreateHabit: {habit?: Habit};
  AllHabits: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
