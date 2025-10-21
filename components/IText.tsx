import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Text, TextProps } from "react-native";

type ITextProps = TextProps & {
  color?: string;
  size?: number;
  weight?: "400" | "500" | "600" | "700" | "bold";
  fonts?: "regular" | "semiBold" | "bold" | "medium" | "light" | "extraBold";
  style?: any;
};

const fontMap = {
  regular: "Nunito-Regular",
  semiBold: "Nunito-SemiBold",
  bold: "Nunito-Bold",
  medium: "Nunito-Medium",
  light: "Nunito-Light",
  extraBold: "Nunito-ExtraBold",
};

export default function IText({
  children,
  color,
  size = 14,
  weight = "400",
  fonts = "regular",
  style,
  ...props
}: ITextProps) {
  const { colors } = useTheme();

  const textColor = color || colors.secondary;
  const fontFamily = fontMap[fonts];

  return (
    <Text
      style={[
        { color: textColor, fontSize: size, fontWeight: weight, fontFamily },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
