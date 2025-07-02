import React from "react";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import Animated, {useSharedValue, useAnimatedStyle, withSpring, withTiming} from "react-native-reanimated";

const ReanimatedTest: React.FC = () => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}, {rotate: `${rotation.value}deg`}, {translateY: translateY.value}],
    };
  });

  const handlePress = () => {
    // 스케일 애니메이션
    scale.value = withSpring(1.2, {damping: 10, stiffness: 100}, () => {
      scale.value = withSpring(1);
    });

    // 회전 애니메이션
    rotation.value = withTiming(360, {duration: 1000}, () => {
      rotation.value = 0;
    });

    // Y축 이동 애니메이션
    translateY.value = withSpring(-20, {damping: 10, stiffness: 100}, () => {
      translateY.value = withSpring(0);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Reanimated Test</Text>
      <TouchableOpacity onPress={handlePress} style={styles.buttonContainer}>
        <Animated.View style={[styles.animatedBox, animatedStyle]}>
          <Text style={styles.buttonText}>Tap Me!</Text>
        </Animated.View>
      </TouchableOpacity>
      <Text style={styles.description}>버튼을 탭하면 스케일, 회전, 이동 애니메이션이 실행됩니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#333",
  },
  buttonContainer: {
    marginBottom: 30,
  },
  animatedBox: {
    width: 120,
    height: 120,
    backgroundColor: "#007AFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    lineHeight: 24,
  },
});

export default ReanimatedTest;
