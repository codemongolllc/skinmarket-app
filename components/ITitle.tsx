// components/ScreenTitle.tsx
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleSheet, View } from "react-native";
import IText from "./IText";

interface ScreenTitleProps {
  title: string;
  type?: "primary" | "secondary" | "tertiary";
  color?: any;
  end?: any;
  start?: any;
}

export default function ITitle({
  title,
  type = "primary",
  end,
  color,
}: ScreenTitleProps) {
  const { colors } = useTheme();

  let titleStyle = {};
  let containerStyle = {};

  switch (type) {
    case "primary":
      titleStyle = {
        fontSize: 20,
        fontWeight: "700",
        color: color || colors.dark,
      };
      containerStyle = {
        paddingVertical: 16,
        backgroundColor: "transparent",
      };
      break;

    default:
      titleStyle = {
        fontSize: 18,
        fontWeight: "600",
        color: colors.dark,
      };
      containerStyle = {
        paddingVertical: 12,
        backgroundColor: "transparent",
      };
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <IText fonts="bold" size={20} color={colors.dark}>
        {title}
      </IText>
      {end && end}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    // textAlign: "center",
  },
});
