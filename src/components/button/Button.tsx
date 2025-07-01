import {StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  bottom?: boolean;
}

const Button = ({title, onPress, style, textStyle, disabled = false, bottom = false}: ButtonProps) => {
  const {bottom: bottomInset} = useSafeAreaInsets();
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled, bottom && styles.bottomFixed, bottom && {marginBottom: bottomInset + 20}]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}>
      <Text style={[styles.buttonText, textStyle, disabled && styles.disabledText]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    backgroundColor: "#E5E5EA",
  },
  disabledText: {
    color: "#8E8E93",
  },
  bottom: {
    marginBottom: 20,
  },
  bottomFixed: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },
});
