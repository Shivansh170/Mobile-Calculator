import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  value?: string;
  bgColor: string;
  textColor: string;
  onPress: () => void;
}

const ZeroButton = ({ value = "0", bgColor, textColor, onPress }: Props) => {
  return (
    // Apply styles here, but without aspect-square
    <TouchableOpacity
      className="rounded-full justify-center items-center px-7" // Align text left with padding
      style={{
        backgroundColor: bgColor,
        flex: 1.5,
      }}
      onPress={onPress}
    >
      <Text className="text-2xl font-bold" style={{ color: textColor }}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

export default ZeroButton;
