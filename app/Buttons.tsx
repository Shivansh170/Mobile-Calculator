import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  value: string;
  bgColor: string;
  textColor: string;
  onPress: () => void;
}

const Buttons = ({ value, bgColor, textColor, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="rounded-full aspect-square justify-center items-center flex-1"
      style={{
        backgroundColor: bgColor,
      }}
      onPress={onPress}
    >
      <Text className="text-2xl font-bold" style={{ color: textColor }}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

export default Buttons;
