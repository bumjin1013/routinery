import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "@/screens/HomeScreen";
import CreateHabitScreen from "@/screens/CreateHabitScreen";
import {RootStackParamList} from "@/types/navigation";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen
          name="CreateHabit"
          component={CreateHabitScreen}
          options={{
            title: "습관 생성",
            headerShown: true,
            animation: "slide_from_bottom",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
