import {StackNavigationProp} from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  CreateHabit: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
