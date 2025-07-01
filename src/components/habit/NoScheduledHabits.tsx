import {StyleSheet, Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const NoScheduledHabits = () => {
  const {bottom} = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingBottom: bottom + 100}]}>
      <Text style={styles.icon}>📅</Text>
      <Text style={styles.title}>오늘 할 일이 없습니다</Text>
      <Text style={styles.subtitle}>다른 날짜를 선택하거나 새로운 습관을 만들어보세요!</Text>
    </View>
  );
};

export default NoScheduledHabits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
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
});
