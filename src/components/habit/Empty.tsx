import {StyleSheet, Text, View} from "react-native";
import Button from "@/components/button/Button";
import {useNavigation} from "@react-navigation/native";
import {RootStackNavigationProp} from "@/types/navigation";

const Empty = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📝</Text>
      <Text style={styles.title}>습관이 없습니다</Text>
      <Text style={styles.subtitle}>새로운 습관을 만들어보세요!</Text>
      <Button title="습관 추가" onPress={() => navigation.navigate("CreateHabit")} style={styles.button} />
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  iconContainer: {
    marginBottom: 16,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    marginTop: 20,
  },
});
